const express = require("express");
const router = express.Router();
const postControllerActions = require("../controllers/postControllers");
const { verifyToken: verifyUserToken, optionallyVerifyToken: optionallyVerifyUserToken } = require("../middleware/auth");

router.get("/", optionallyVerifyUserToken, postControllerActions.getMultiplePosts);

router.post("/", verifyUserToken, postControllerActions.createPost);

router.get("/:id", optionallyVerifyUserToken, postControllerActions.getSinglePost);

router.patch("/:id", verifyUserToken, postControllerActions.updatePost);

router.delete("/:id", verifyUserToken, postControllerActions.deletePost);

module.exports = router;
