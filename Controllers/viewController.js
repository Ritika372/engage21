const Subject = require("../Model/subjectModel");
const Quiz = require("../Model/quizModel");
const Result = require("../Model/resultModel");
const Question = require("../Model/questionModel");
const customError = require("../utils/customError");

exports.getLoginForm = async (req, res, next) => {
  res.status(200).render("login");
};

exports.getSignUpForm = async (req, res, next) => {
  res.status(200).render("signup");
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

exports.getAddNotesPage = async (req, res, next) => {
  try {
    const subjects = await Subject.find();
    res.status(200).render("addNotes", { subjects, user: req.user });
  } catch (err) {
    next(err);
  }
};
exports.getUpdateProfilePage = async (req, res, next) => {
  res.status(200).render("updateProfile", { user: req.user });
};

exports.getStudyPage = async (req, res, next) => {
  try{
  const subjects = await Subject.find();
  
  res.status(200).render("study", {
    user: req.user,
    subjects,
  });
}
 catch (err) {
  next(err);
}
};
exports.getQuestionsOfQuizById = async (req, res, next) => {
  try {
    const quizId = req.params.id;
    const questions = await Question.find({ quiz: quizId });
    res.status(200).render("questions", {
      questions,
      link: `/quizzes/${quizId}/addQuestion`,
      user: req.user,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAddQuestionPage = async (req, res, next) => {
  try {
    res
      .status(200)
      .render("addQues", { quizId: req.params.id, user: req.user });
  } catch (err) {
    next(err);
  }
};

exports.getRandomQuestionsOfQuizById = async (req, res, next) => {
  try {
    const result = await Result.find({
      user: req.user._id,
      quiz: req.params.id,
    });
    if (result.length === 1) {
      return next(new customError("You have already attempted the quiz!", 400));
    }

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

exports.getQuizResultPage = async (req, res, next) => {
  try {
    const result = await Result.find({
      quiz: req.params.id,
      user: req.user._id,
    });
    res.status(200).render("quizResult", { result });
  } catch (err) {
    next(err);
  }
};

exports.getProfilePage = async (req, res, next) => {
  try {
    if (req.user.role === "admin") {
      res.status(200).render("profile", { user: req.user });
    }

    const subjects = await Subject.find();
    const quizAttemptedByUser = await Result.find({ user: req.user._id });

    let quizAttemptedByUserArrayOfIds = [];

    quizAttemptedByUser.forEach((quiz) => {
      quizAttemptedByUserArrayOfIds.push(quiz.quiz);
    });

    const activeQuizzes = await Quiz.find({
      active: true,
      "questions.0": { $exists: true },
      _id: { $nin: quizAttemptedByUserArrayOfIds },
    });
    res.status(200).render("studentProfile", {
      user: req.user,
      subjects,
      activeQuizzes,
      quizAttemptedByUser,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAttemptsOfQuizById = async (req, res, next) => {
  try {
    var results = await Result.find({ quiz: req.params.id });
    const quiz = await Quiz.findById(req.params.id);
    results.sort((res1, res2) => {
      return res2.percentage - res1.percentage;
    });
    res.status(200).render("attempts", { results, quiz, user: req.user });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.cookie("jwt", "loggedOut", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
    res.status(200).render("login");
  } catch (err) {
    next(err);
  }
};

exports.getAdminDashboard = async (req, res, next) => {
  try {
    let agg = Result.aggregate([
      { $group: { _id: "$quiz", avgMarks: { $avg: "$percentage" } } },
    ]);

    let results = [];

    for await (const doc of agg) {
      const quiz = await Quiz.findById(doc._id);
      results.push({
        quiz,
        avgPerc: doc.avgMarks.toFixed(2),
      });
    }
    res.status(200).render("adminDashboard", { results });
  } catch (err) {
    next(err);
  }
};
