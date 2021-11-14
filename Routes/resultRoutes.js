const resultController = require("../Controllers/resultController");
const authController = require("../Controllers/authController");
const express = require("express");

const router = express.Router();

router.use(authController.protect);
router.use(authController.restrictTo("admin"));

router
  .route("/")
  .get(resultController.getAllResults)
  .post(authController.restrictTo("admin"), resultController.createResult);

router
  .route("/:id")
  .get(resultController.getOneResult)
  .patch(authController.restrictTo("admin"), resultController.updateResult)
  .delete(authController.restrictTo("admin"), resultController.deleteResult);

module.exports = router;
