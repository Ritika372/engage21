const quizController = require("../Controllers/quizController");
const questionRouter = require("./questionRoutes");
const authController = require("../Controllers/authController");
const express = require("express");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route("/")
  .get(quizController.getAllQuiz)
  .post(authController.restrictTo("admin"), quizController.createQuiz);

router
  .route("/:id")
  .get(quizController.getOneQuiz)
  .post(quizController.evaluateQuiz)
  .patch(authController.restrictTo("admin"), quizController.updateQuiz)
  .delete(authController.restrictTo("admin"), quizController.deleteQuiz);

router.use("/:quizId/questions", questionRouter);

module.exports = router;
