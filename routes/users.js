const express = require("express");
const router = express.Router();
const userControllerActions = require("../controllers/userControllers");
const loginControllerActions = require("../controllers/loginControllers");
const { verifyToken: verifyUserToken } = require("../middleware/auth");

router.post("/register", loginControllerActions.register);

router.post("/login", loginControllerActions.login);

router.get("/:username", userControllerActions.getUser);

router.patch("/:id", verifyUserToken, userControllerActions.updateUser);

module.exports = router;
