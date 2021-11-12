const questionController = require("../Controllers/questionController");
const authController = require("../Controllers/authController");

const express = require("express");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route("/")
  .get(questionController.getAllQuestion)
  .post(authController.restrictTo("admin"), questionController.createQuestion);

router.use(authController.restrictTo("admin"));

router
  .route("/:id")
  .get(questionController.getOneQuestion)
  .patch(questionController.updateQuestion)
  .delete(questionController.deleteQuestion);

module.exports = router;
