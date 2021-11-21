const express = require("express");
const viewController = require("../Controllers/viewController");
const authController = require("../Controllers/authController");
const router = express.Router();

router.get("/login", viewController.getLoginForm);
router.get("/signup", viewController.getSignUpForm);

router.use(authController.protect);

router.get("/quizzes/:id/attemptQuiz", viewController.getRandomQuestionsOfQuizById);
router.get("/quizzes/:id/result", viewController.getQuizResultPage);
router.get("/home", viewController.getProfilePage);
router.get("/logout", viewController.logout);

router.use(authController.restrictTo("admin"));

router.get("/updateProfile", viewController.getUpdateProfilePage);
router.get("/subjects", viewController.getSubjectPage);
router.get("/addSubject", viewController.getAddSubjectPage);
router.get("/quizzes", viewController.getQuizPage);
router.get("/dashboard", viewController.getAdminDashboard);
router.get("/addQuiz", viewController.getAddQuizPage);
router.get("/quizzes/:id/questions", viewController.getQuestionsOfQuizById);
router.get("/quizzes/:id/addQuestion", viewController.getAddQuestionPage);
router.get("/quizzes/:id/attempts", viewController.getAttemptsOfQuizById);
module.exports = router;
