const express = require("express");
const UserController = require("../Controllers/userController");
const authController = require("../Controllers/authController");

const router = express.Router();

router.post("/signup", authController.signUp);
router.get("/getAllUsers", UserController.getAllUsers);
//router.get("/me",UserController.getUser);
// router.patch(
//   "/updateMe",
//   UserController.updateMe
// );

// router.delete("/deleteMe", UserController.deleteMe);

module.exports = router;
