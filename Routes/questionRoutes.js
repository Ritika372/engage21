const questionController = require("../Controllers/questionController");
const express = require("express");

const router = express.Router({ mergeParams: true });

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
