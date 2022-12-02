const express = require("express");
const router = express.Router();
const messageControllerActions = require("../controllers/messageController");
const { verifyToken: verifyUserToken } = require("../middleware/auth");

router.get("/", verifyUserToken, messageControllerActions.getChats);

router.post("/:id", verifyUserToken, messageControllerActions.sendMessage);

router.get("/:id", verifyUserToken, messageControllerActions.getMessages);

module.exports = router;
