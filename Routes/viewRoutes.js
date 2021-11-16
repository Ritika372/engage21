const express = require("express");
const viewController = require("../Controllers/viewController");
const authController = require("../Controllers/authController");
const router = express.Router();

router.get("/login", viewController.getLoginForm);
router.get("/signup", viewController.getSignUpForm);

router.use(authController.protect);

router.get("/profile", viewController.getProfilePage);
router.get("/activeQuizzes", viewController.getActiveQuizzes);

router.use(authController.restrictTo("admin"));

router.get("/subjects", viewController.getSubjectPage);
router.get("/addSubject", viewController.getAddSubjectPage);
router.get("/quizzes", viewController.getQuizPage);
router.get("/addQuiz", viewController.getAddQuizPage);
router.get("/quizzes/:id/questions", viewController.getQuestionsOfQuizById);
router.get("/quizzes/:id/addQuestion", viewController.getAddQuestionPage);
module.exports = router;
