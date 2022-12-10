const jwt = require("jsonwebtoken");

/**
 * Middleware to verify the presence and validity of an authentication token.
 *
 * This function checks for an "x-access-token" in the request headers, decodes it, and appends
 * the decoded `userId` and `isAdmin` properties to the request body.
 * If the token is missing or invalid, it responds with an error.
 *
 * @param {Object} req The request object, containing headers and body.
 * @param {Object} res The response object, used to return an error message.
 * @param {Function} next The callback to pass control to the next middleware.
 */
const verifyToken = (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];

        if (!token) {
            throw new Error("No token provided");
        }

        const {userId, isAdmin} = jwt.decode(token, process.env.TOKEN_KEY);

        req.body = {
            ...req.body, userId, isAdmin,
        };

        return next();
    } catch (err) {
        return res.status(400).json({error: err.message});
    }
};

/**
 * Optional middleware to verify an authentication token if present.
 *
 * This function attempts to verify and decode the "x-access-token" from the request headers.
 * If the token is present and valid, it appends the `userId` property to the request body.
 * If the token is missing or invalid, it simply passes control to the next middleware without error.
 *
 * @param {Object} req The request object, containing headers and body.
 * @param {Object} res The response object, used in case of needing to pass an error (unused here).
 * @param {Function} next The callback to pass control to the next middleware.
 */
const optionallyVerifyToken = (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];

        if (!token) {
            return next();
        }

        const decoded = jwt.decode(token, process.env.TOKEN_KEY);
        req.body.userId = decoded.userId;

        next();
    } catch (err) {
        return next();
    }
};

module.exports = {verifyToken, optionallyVerifyToken};