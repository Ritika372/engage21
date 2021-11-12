const subjectController = require("../Controllers/subjectController");
const authController = require("../Controllers/authController");
const express = require("express");

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(subjectController.getAllSubjects)
  .post(authController.restrictTo("admin"), subjectController.createSubject);

router
  .route("/:id")
  .get(subjectController.getOneSubject)
  .patch(authController.restrictTo("admin"), subjectController.updateSubject)
  .delete(authController.restrictTo("admin"), subjectController.deleteSubject);

module.exports = router;
