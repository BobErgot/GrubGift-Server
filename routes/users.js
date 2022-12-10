const express = require("express");
const router = express.Router();
const userControllerActions = require("../controllers/userControllers");
const loginControllerActions = require("../controllers/loginControllers");
const { verifyToken: verifyUserToken } = require("../middleware/auth");

/**
 * Registers a new user.
 *
 * @route POST /register
 * @access Public
 * @action register - Controller action to handle user registration.
 */
router.post("/register", loginControllerActions.register);

/**
 * Authenticates a user and returns a token.
 *
 * @route POST /login
 * @access Public
 * @action login - Controller action to handle user login.
 */
router.post("/login", loginControllerActions.login);

/**
 * Retrieves a list of random users.
 *
 * @route GET /random
 * @access Public
 * @action getRandomUsers - Controller action to fetch random users.
 */
router.get("/random", userControllerActions.getRandomUsers);

/**
 * Retrieves the details of a user by username.
 *
 * @route GET /:username
 * @access Public
 * @param {String} username - The username of the user to retrieve.
 * @action getUser - Controller action to fetch a user by username.
 */
router.get("/:username", userControllerActions.getUser);

/**
 * Updates a user's details by user ID. Requires user authentication.
 *
 * @route PATCH /:id
 * @access Private
 * @param {String} id - The ID of the user to update.
 * @uses verifyUserToken - Middleware to authenticate the user.
 * @action updateUser - Controller action to update user details.
 */
router.patch("/:id", verifyUserToken, userControllerActions.updateUser);

/**
 * Follows a user by their user ID. Requires user authentication.
 *
 * @route POST /follow/:id
 * @access Private
 * @param {String} id - The ID of the user to follow.
 * @uses verifyUserToken - Middleware to authenticate the user.
 * @action followUser - Controller action to follow a user.
 */
router.post("/follow/:id", verifyUserToken, userControllerActions.followUser);

/**
 * Unfollows a user by their user ID. Requires user authentication.
 *
 * @route DELETE /unfollow/:id
 * @access Private
 * @param {String} id - The ID of the user to unfollow.
 * @uses verifyUserToken - Middleware to authenticate the user.
 * @action unfollowUser - Controller action to unfollow a user.
 */
router.delete("/unfollow/:id", verifyUserToken, userControllerActions.unfollowUser);

/**
 * Retrieves all followers of a user by user ID.
 *
 * @route GET /followers/:id
 * @access Public
 * @param {String} id - The ID of the user whose followers to retrieve.
 * @action getFollowersOfUser - Controller action to fetch a user's followers.
 */
router.get("/followers/:id", userControllerActions.getFollowersOfUser);

/**
 * Retrieves the following count of a user by user ID.
 *
 * @route GET /following/:id
 * @access Public
 * @param {String} id - The ID of the user whose following count to retrieve.
 * @action getFollowingOfUser - Controller action to fetch the count of people a user is following.
 */
router.get("/following/:id", userControllerActions.getFollowingOfUser);

module.exports = router;
