const express = require("express");
const UserController = require("../Controllers/userController");

const router = express.Router();

router.get("/me",UserController.getUser);
router.patch(
  "/updateMe",
  UserController.updateMe
);

router.delete("/deleteMe", UserController.deleteMe);

module.exports = router;
