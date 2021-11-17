const Subject = require("../Model/subjectModel");
const Quiz = require("../Model/quizModel");
const Result = require("../Model/resultModel");
const Question = require("../Model/questionModel");

exports.getLoginForm = async (req, res, next) => {
  res.status(200).render("login");
};

exports.getSignUpForm = async (req, res, next) => {
  res.status(200).render("signup");
};

exports.getAdminProfilePage = async (req, res, next) => {
  try {
    res.status(200).render("profile");
  } catch (err) {
    next(err);
  }
};

exports.getSubjectPage = async (req, res, next) => {
  try {
    const subjects = await Subject.find();

    res.status(200).render("subjects", { subjects, user: req.user });
  } catch (err) {
    next(err);
  }
};

exports.getAddSubjectPage = async (req, res, next) => {
  res.status(200).render("addSubject", { user: req.user });
};

//show only those quizzes which are active and not attempted by user.
exports.getActiveQuizzes = async (req, res, next) => {
  try {
    const subjects = await Subject.find();
    const quizAttemptedByUser = await Result.find(
      { user: req.user._id },
      { _id: 1 }
    );
    const activeQuizzes = await Quiz.find({
      active: true,
      _id: { $nin: quizAttemptedByUser },
    });
    console.log(activeQuizzes);

    res
      .status(200)
      .render("activeQuizzes", { quizzes: activeQuizzes, subjects });
  } catch (err) {
    next(err);
  }
};

exports.getQuizPage = async (req, res, next) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).render("quizzes", { quizzes, user: req.user });
  } catch (err) {
    next(err);
  }
};

exports.getAddQuizPage = async (req, res, next) => {
  try {
    const subjects = await Subject.find();
    res.status(200).render("addQuiz", { subjects, user: req.user });
  } catch (err) {
    next(err);
  }
};

exports.getQuestionsOfQuizById = async (req, res, next) => {
  try {
    const quizId = req.params.id;
    const questions = await Question.find({ quiz: quizId });
    console.log(`/quizzes/${quizId}/addQuestion`);
    res.status(200).render("questions", {
      questions,
      link: `/quizzes/${quizId}/addQuestion`,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAddQuestionPage = async (req, res, next) => {
  try {
    res.status(200).render("addQues", { quizId: req.params.id });
  } catch (err) {
    next(err);
  }
};

exports.getRandomQuestionsOfQuizById = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    let questions = quiz.questions;
    if (questions.length > quiz.numberOfQuestions) {
      // Shuffle
      const shuffled = questions.sort(() => 0.5 - Math.random());

      // Get sub-array of first n elements after shuffled
      questions = shuffled.slice(0, quiz.numberOfQuestions);
    }
    res.status(200).render("attemptQuiz", { quiz, questions });
  } catch (err) {
    next(err);
  }
};
