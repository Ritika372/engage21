const questionController = require("../Controllers/questionController");
const authController = require("../Controllers/authController");

const express = require("express");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.get("/random", questionController.getRandomQuestions);

router.use(authController.restrictTo("admin"));
router
  .route("/")
  .get(questionController.getAllQuestion)
  .post(questionController.createQuestion);

router
  .route("/:id")
  .get(questionController.getOneQuestion)
  .patch(questionController.updateQuestion)
  .delete(questionController.deleteQuestion);

module.exports = router;
