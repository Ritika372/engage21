const quizController = require("../Controllers/quizController");
const questionRouter = require("./questionRoutes");
const express = require("express");

const router = express.Router();

router
  .route("/")
  .get(quizController.getAllQuiz)
  .post(quizController.createQuiz);

router
  .route("/:id")
  .get(quizController.getOneQuiz)
  .patch(quizController.updateQuiz)
  .delete(quizController.deleteQuiz);

router.use("/:id/questions", questionRouter);

module.exports = router;
