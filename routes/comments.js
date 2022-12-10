const express = require("express");
const router = express.Router();
const commentControllerActions = require("../controllers/commentControllers");
const {verifyToken: verifyUserToken} = require("../middleware/auth");

/**
 * Updates an existing comment by its ID. Requires user authentication.
 *
 * @route PATCH /:id
 * @access Private
 * @param {String} id - The ID of the comment to update.
 * @uses verifyUserToken - Middleware to authenticate the user.
 * @action updateComment - Controller action to handle the comment update.
 */
router.patch("/:id", verifyUserToken, commentControllerActions.updateComment);

/**
 * Creates a new comment associated with a specific entity (e.g., a post).
 * Requires user authentication.
 *
 * @route POST /:id
 * @access Private
 * @param {String} id - The ID of the entity to which the comment is associated.
 * @uses verifyUserToken - Middleware to authenticate the user.
 * @action putComment - Controller action to handle comment creation.
 */
router.post("/:id", verifyUserToken, commentControllerActions.putComment);

/**
 * Deletes a specific comment by its ID. Requires user authentication.
 *
 * @route DELETE /:id
 * @access Private
 * @param {String} id - The ID of the comment to delete.
 * @uses verifyUserToken - Middleware to authenticate the user.
 * @action deleteComment - Controller action to handle the comment deletion.
 */
router.delete("/:id", verifyUserToken, commentControllerActions.deleteComment);

/**
 * Retrieves all comments associated with a specific post.
 *
 * @route GET /post/:id
 * @access Public
 * @param {String} id - The ID of the post for which to retrieve comments.
 * @action getCommentsOfPost - Controller action to fetch comments of a specific post.
 */
router.get("/post/:id", commentControllerActions.getCommentsOfPost);

/**
 * Retrieves all comments made by a specific user.
 *
 * @route GET /user/:id
 * @access Public
 * @param {String} id - The ID of the user whose comments to retrieve.
 * @action getCommentsOfUser - Controller action to fetch comments made by a specific user.
 */
router.get("/user/:id", commentControllerActions.getCommentsOfUser);

module.exports = router;