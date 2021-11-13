const express = require("express");
const viewController = require("../Controllers/viewController");
const authController = require("../Controllers/authController");
const router = express.Router();

router.get("/login", viewController.getLoginForm);
router.get("/signup", viewController.getSignUpForm);
router.get("/profile", viewController.getProfilePage);

module.exports = router;
