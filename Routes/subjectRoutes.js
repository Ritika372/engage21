const subjectController = require("../Controllers/subjectController");
const authController = require("../Controllers/authController");
const quizRouter = require("../Routes/quizRoutes");
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

router.post("/:id/addNotes" , subjectController.uploadNotes, subjectController.updateSubject);


router.use("/:subId/quiz", quizRouter);

module.exports = router;
