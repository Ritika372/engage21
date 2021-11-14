const express = require("express");
const viewController = require("../Controllers/viewController");
const authController = require("../Controllers/authController");
const router = express.Router();

router.get("/login", viewController.getLoginForm);
router.get("/signup", viewController.getSignUpForm);

router.use(authController.protect);
router.use(authController.restrictTo("admin"));

router.get("/profile", viewController.getProfilePage);
router.get("/subjects", viewController.getSubjectPage);
router.get("/addSubject", viewController.getAddSubjectPage);
module.exports = router;
