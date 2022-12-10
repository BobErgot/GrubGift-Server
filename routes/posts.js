const express = require("express");
const router = express.Router();
const postControllerActions = require("../controllers/postControllers");
const likeControllerActions = require("../controllers/likeControllers");
const {verifyToken: verifyUserToken, optionallyVerifyToken: optionallyVerifyUserToken} = require(
    "../middleware/auth");

/**
 * Retrieves all posts, with optional user authentication to customize the response.
 *
 * @route GET /
 * @access Public (with optional authentication)
 * @uses optionallyVerifyUserToken - Middleware to optionally authenticate the user.
 * @action getMultiplePosts - Controller action to fetch multiple posts.
 */
router.get("/", optionallyVerifyUserToken, postControllerActions.getMultiplePosts);

/**
 * Creates a new post. Requires user authentication.
 *
 * @route POST /
 * @access Private
 * @uses verifyUserToken - Middleware to authenticate the user.
 * @action createPost - Controller action to handle post creation.
 */
router.post("/", verifyUserToken, postControllerActions.createPost);

/**
 * Retrieves a specific post by its ID, with optional user authentication to provide additional
 * details.
 *
 * @route GET /:id
 * @access Public (with optional authentication)
 * @param {String} id - The ID of the post to retrieve.
 * @uses optionallyVerifyUserToken - Middleware to optionally authenticate the user.
 * @action getSinglePost - Controller action to fetch a single post.
 */
router.get("/:id", optionallyVerifyUserToken, postControllerActions.getSinglePost);

/**
 * Updates an existing post by its ID. Requires user authentication.
 *
 * @route PATCH /:id
 * @access Private
 * @param {String} id - The ID of the post to update.
 * @uses verifyUserToken - Middleware to authenticate the user.
 * @action updatePost - Controller action to handle post update.
 */
router.patch("/:id", verifyUserToken, postControllerActions.updatePost);

/**
 * Deletes a specific post by its ID. Requires user authentication.
 *
 * @route DELETE /:id
 * @access Private
 * @param {String} id - The ID of the post to delete.
 * @uses verifyUserToken - Middleware to authenticate the user.
 * @action deletePost - Controller action to handle post deletion.
 */
router.delete("/:id", verifyUserToken, postControllerActions.deletePost);

/**
 * Likes a specific post by its ID. Requires user authentication.
 *
 * @route POST /like/:id
 * @access Private
 * @param {String} id - The ID of the post to like.
 * @uses verifyUserToken - Middleware to authenticate the user.
 * @action likePost - Controller action to handle liking a post.
 */
router.post("/like/:id", verifyUserToken, likeControllerActions.likePost);

/**
 * Unlikes a specific post by its ID. Requires user authentication.
 *
 * @route DELETE /like/:id
 * @access Private
 * @param {String} id - The ID of the post to unlike.
 * @uses verifyUserToken - Middleware to authenticate the user.
 * @action unlikePost - Controller action to handle unliking a post.
 */
router.delete("/like/:id", verifyUserToken, likeControllerActions.unlikePost);

/**
 * Retrieves all posts liked by a specific user, with optional user authentication.
 *
 * @route GET /liked/:id
 * @access Public (with optional authentication)
 * @param {String} id - The ID of the user whose liked posts are to be retrieved.
 * @uses optionallyVerifyUserToken - Middleware to optionally authenticate the user.
 * @action getUserLikedPosts - Controller action to fetch posts liked by a user.
 */
router.get("/liked/:id", optionallyVerifyUserToken, likeControllerActions.getUserLikedPosts);

module.exports = router;