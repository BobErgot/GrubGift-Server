const express = require("express");
const router = express.Router();
const messageControllerActions = require("../controllers/messageController");
const {verifyToken: verifyUserToken} = require("../middleware/auth");

/**
 * Retrieves all chat conversations for the authenticated user.
 *
 * This route returns a list of chat conversations involving the authenticated user,
 * providing an overview of all their messaging interactions.
 *
 * @route GET /
 * @access Private
 * @uses verifyUserToken - Middleware to authenticate the user.
 * @action getChats - Controller action to fetch the user's chat conversations.
 */
router.get("/", verifyUserToken, messageControllerActions.getChats);

/**
 * Sends a message to a particular user identified by their ID.
 *
 * This route handles the creation and sending of a message from the authenticated user
 * to the specified recipient. The recipient's ID is passed as a URL parameter.
 *
 * @route POST /:id
 * @access Private
 * @param {String} id - The ID of the recipient user.
 * @uses verifyUserToken - Middleware to authenticate the user.
 * @action sendMessage - Controller action to handle sending of the message.
 */
router.post("/:id", verifyUserToken, messageControllerActions.sendMessage);

/**
 * Retrieves messages specific to the authenticated user and another user identified by their ID.
 *
 * This route fetches messages exchanged between the authenticated user and the user specified
 * by the ID parameter, allowing for retrieval of their message history.
 *
 * @route GET /:id
 * @access Private
 * @param {String} id - The ID of the other user involved in the messages.
 * @uses verifyUserToken - Middleware to authenticate the user.
 * @action getMessages - Controller action to fetch the messages between the two users.
 */
router.get("/:id", verifyUserToken, messageControllerActions.getMessages);

module.exports = router;