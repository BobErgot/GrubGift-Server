const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

/**
 * Constructs a user dictionary to be returned upon successful authentication.
 *
 * @param {String} token JWT token for the authenticated session.
 * @param {Object} user User object from the database.
 * @returns {Object} A dictionary containing user information and session token.
 */
const getUserDict = (token, user) => {
    return {
        token, username: user.username, userId: user._id, isAdmin: user.isAdmin,
    };
};

/**
 * Builds a token payload with essential user information.
 *
 * @param {Object} user User object from the database.
 * @returns {Object} A payload containing user ID and admin status.
 */
const buildToken = (user) => {
    return {
        userId: user._id, isAdmin: user.isAdmin,
    };
};

/**
 * Registers a new user with the provided username, email, and password.
 * Checks for existing users with the same email or username to avoid duplicates.
 * Hashes the password before storing it in the database.
 *
 * @param {Object} req The request object containing user registration data.
 * @param {Object} res The response object used to return the newly created user info or an error.
 */
const register = async (req, res) => {
    try {
        const {username, email, password, role} = req.body;

        if (username && email && password) {
            const convertedEmail = email.toLowerCase();
            const hashedPassword = await bcrypt.hash(password, 10);
            const existingUser = await User.findOne({
                                                        $or: [{email: convertedEmail}, {username}],
                                                    });
            let isAdminCheck = false;
            if (role === 'Moderator') {
                isAdminCheck = true
            }
            if (!existingUser) {
                const newUser = await User.create({
                                                      username,
                                                      email: convertedEmail,
                                                      password: hashedPassword,
                                                      role: role,
                                                      isAdmin: isAdminCheck
                                                  });
                const token = jwt.sign(buildToken(newUser), process.env.TOKEN_KEY);
                return res.json(getUserDict(token, newUser));
            } else {
                throw new Error("Cannot have duplicate email and username");
            }
        } else {
            throw new Error("Insufficient information to register");
        }
    } catch (err) {
        return res.status(400).json({error: err.message});
    }
};

/**
 * Authenticates a user with the provided email and password.
 * Compares the given password with the hashed password stored in the database.
 * Returns a JWT token upon successful authentication.
 *
 * @param {Object} req The request object containing user login credentials.
 * @param {Object} res The response object used to return the authentication token or an error.
 */
const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (email && password) {
            const convertedEmail = email.toLowerCase();
            const user = await User.findOne({email: convertedEmail});
            if (user) {
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (isPasswordValid) {
                    const token = jwt.sign(buildToken(user), process.env.TOKEN_KEY);
                    return res.json(getUserDict(token, user));
                } else {
                    throw new Error("Email or password incorrect");
                }
            } else {
                throw new Error("Email or password incorrect");
            }
        } else {
            throw new Error("Insufficient information to login");
        }
    } catch (err) {
        return res.status(400).json({error: err.message});
    }
};

module.exports = {
    register, login,
};