const User = require("../models/User");
const Post = require("../models/Post");
const Follow = require("../models/Follow");

/**
 * Retrieves a user's profile, including their posts and aggregate like counts.
 *
 * @param {Object} req The request object, including the username in the params.
 * @param {Object} res The response object used to return the user profile data.
 */
const getUser = async (req, res) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({username}).select("-password");
        if (user) {
            const posts = await Post.find({poster: user._id})
                .populate("poster")
                .sort("-createdAt");
            let likeCount = 0;
            posts.forEach((post) => {
                likeCount += post.likeCount;
            });
            const data = {
                user, posts: {
                    count: posts.length, likeCount, data: posts,
                },
            };
            return res.status(200).json(data);
        } else {
            throw new Error("User does not exist");
        }
    } catch (err) {
        return res.status(400).json({error: err.message});
    }
};

/**
 * Fetches a random selection of users from the database.
 *
 * @param {Object} req The request object, optionally including the desired number of random users
 *     in the query.
 * @param {Object} res The response object used to return an array of random users.
 */
const getRandomUsers = async (req, res) => {
    try {
        let {size} = req.query;
        const users = await User.find().select("-password");
        const randomUsers = [];
        if (size > users.length) {
            size = users.length;
        }
        const randomSizes = getRandomSizes(size, users.length);

        for (let i = 0; i < randomSizes.length; i++) {
            const randomUser = users[randomSizes[i]];
            randomUsers.push(randomUser);
        }
        return res.status(200).json(randomUsers);
    } catch (err) {
        return res.status(400).json({error: err.message});
    }
};

/**
 * Creates a follow relationship between the current user and another user.
 *
 * @param {Object} req The request object, including the follower's and followee's IDs.
 * @param {Object} res The response object used to confirm the follow action.
 */
const followUser = async (req, res) => {
    try {
        const {userId} = req.body;
        const followingId = req.params.id;
        const isAlreadyFollowed = await Follow.find({userId, followingId});

        if (!isAlreadyFollowed) {
            const follow = await Follow.create({userId, followingId});
            return res.status(200).json({data: follow});
        } else {
            throw new Error("This user is already followed");
        }
    } catch (err) {
        return res.status(400).json({error: err.message});
    }
};

/**
 * Removes a follow relationship between the current user and another user.
 *
 * @param {Object} req The request object, including the follower's and followee's IDs.
 * @param {Object} res The response object used to confirm the unfollow action.
 */
const unfollowUser = async (req, res) => {
    try {
        const {userId} = req.body;
        const followingId = req.params.id;
        const isAlreadyFollowed = await Follow.find({userId, followingId});

        if (isAlreadyFollowed) {
            await isAlreadyFollowed.remove();
            return res.status(200).json({data: existingFollow});
        } else {
            throw new Error("This user is not followed");
        }
    } catch (err) {
        return res.status(400).json({error: err.message});
    }
};

/**
 * Retrieves all followers of a specific user.
 *
 * @param {Object} req The request object, including the user ID in the params.
 * @param {Object} res The response object used to return a list of followers.
 */
const getFollowersOfUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const followers = await Follow.find({followingId: userId});
        return res.status(200).json({data: followers});
    } catch (err) {
        return res.status(400).json({error: err.message});
    }
};

/**
 * Retrieves all users that a specific user is following.
 *
 * @param {Object} req The request object, including the user ID in the params.
 * @param {Object} res The response object used to return a list of followed users.
 */
const getFollowingOfUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const following = await Follow.find({userId});
        return res.status(200).json({data: following});
    } catch (err) {
        return res.status(400).json({error: err.message});
    }
};

/**
 * Updates user information for the given user ID.
 *
 * @param {Object} req The request object, including user ID and new information in the body.
 * @param {Object} res The response object used to confirm the update action.
 */
const updateUser = async (req, res) => {
    try {
        const {userId, biography} = req.body;
        const user = await User.findById(userId);
        if (user) {
            if (typeof biography == "string") {
                user.biography = biography;
            }
            await user.save();
            return res.status(200).json({success: true});
        } else {
            throw new Error("User does not exist");
        }
    } catch (err) {
        return res.status(400).json({error: err.message});
    }
};

/**
 * Utility function to generate a list of unique random numbers within a specific range.
 *
 * @param {Number} size The desired number of unique random numbers.
 * @param {Number} sourceSize The upper limit for the random number generation.
 * @returns {Array} An array of unique random numbers.
 */
const getRandomSizes = (size, sourceSize) => {
    const randomSizes = [];
    while (randomSizes.length < size) {
        const randomNumber = Math.floor(Math.random() * sourceSize);
        if (randomSizes.includes(randomNumber)) {
            continue;
        }
        randomSizes.push(randomNumber);
    }
    return randomSizes;
};

module.exports = {
    getUser,
    getRandomUsers,
    followUser,
    unfollowUser,
    getFollowersOfUser,
    getFollowingOfUser,
    updateUser,
};