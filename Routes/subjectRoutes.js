const subjectController = require("../Controllers/subjectController");
const express = require("express");

const router = express.Router();

router
  .route("/")
  .get(subjectController.getAllSubjects)
  .post(subjectController.createSubject);

router
  .route("/:id")
  .get(subjectController.getOneSubject)
  .patch(subjectController.updateSubject)
  .delete(subjectController.deleteSubject);
