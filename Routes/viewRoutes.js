const express = require("express");
const viewController = require("../Controllers/viewController");
const authController = require("../Controllers/authController");
const router = express.Router();

//routes accessible to anyone
router.get("/", viewController.getLoginForm);
router.get("/login", viewController.getLoginForm);
router.get("/signup", viewController.getSignUpForm);

//only access these routes when a logged in user is there.
router.use(authController.protect);

router.get(
  "/quizzes/:id/attemptQuiz",
  viewController.getRandomQuestionsOfQuizById
);
router.get("/quizzes/:id/result", viewController.getQuizResultPage);
router.get("/home", viewController.getProfilePage);
router.get("/logout", viewController.logout);
router.get("/study", viewController.getStudyPage);
router.get("/:id/file", viewController.getFile)

//Restricted to Admin only.

router.use(authController.restrictTo("admin"));

router.get("/updateProfile", viewController.getUpdateProfilePage);
router.get("/subjects", viewController.getSubjectPage);
router.get("/addSubject", viewController.getAddSubjectPage);
router.get("/quizzes", viewController.getQuizPage);
router.get("/dashboard", viewController.getAdminDashboard);
router.get("/addQuiz", viewController.getAddQuizPage);
router.get("/addNotes", viewController.getAddNotesPage);
router.get("/quizzes/:id/questions", viewController.getQuestionsOfQuizById);
router.get("/quizzes/:id/addQuestion", viewController.getAddQuestionPage);
router.get("/quizzes/:id/attempts", viewController.getAttemptsOfQuizById);
module.exports = router;
