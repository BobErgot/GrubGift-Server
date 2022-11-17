const express = require("express");
const router = express.Router();
const commentControllerActions = require("../controllers/commentControllers");
const { verifyToken: verifyUserToken } = require("../middleware/auth");

router.patch("/:id", verifyUserToken, commentControllerActions.updateComment);

router.post("/:id", verifyUserToken, commentControllerActions.putComment);

router.delete("/:id", verifyUserToken, commentControllerActions.deleteComment);

router.get("/post/:id", commentControllerActions.getCommentsOfPost);

router.get("/user/:id", commentControllerActions.getCommentsOfUser);

module.exports = router;
