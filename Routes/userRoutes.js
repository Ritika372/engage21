const express = require("express");
const UserController = require("../Controllers/userController");
const authController = require("../Controllers/authController");

const router = express.Router();

//Routes accessbile to everyone
router.post("/signup", authController.signUp);
router.post("/login", authController.login);

//Routes accessible only to logged in users
router.use(authController.protect)

router.get("/me",UserController.getUser);
router.patch(
  "/updateMe",
  UserController.updateUser
);

router.delete("/deleteMe", UserController.deleteUser);

router.get("/getAllUsers", UserController.getAllUsers);

module.exports = router;
