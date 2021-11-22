const Quiz = require("../Model/quizModel");
const customError = require("../utils/customError");
const Question = require("../Model/questionModel");
const Result = require("../Model/resultModel");
const Email = require("../utils/email");

//Get one Quiz by id
exports.getOneQuiz = async (req, res, next) => {
  try {
    const filter = {};
    if (req.params.subId) filter = { subject: req.params.subId };
    const quiz = await Quiz.findById(req.params.id, filter);
    if (!quiz) {
      return next(new customError("No Quiz with this ID exists!", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        quiz,
      },
    });
  } catch (err) {
    next(err);
  }
};

//Get all Quiz
exports.getAllQuiz = async (req, res, next) => {
  try {
    const filter = {};
    if (req.params.subId) filter = { subject: req.params.subId };
    const quiz = await Quiz.find(filter);
    if (!quiz) {
      return next(new customError("No Quiz with this ID exists!", 404));
    }
    res.status(200).json({
      status: "success",
      result: quiz.length,
      data: {
        quiz,
      },
    });
  } catch (err) {
    next(err);
  }
};

//Create Quiz
exports.createQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        quiz,
      },
    });
  } catch (err) {
    next(err);
  }
};

//Update Quiz
exports.updateQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    if (!quiz) {
      return next(new customError("No Quiz with this ID exists!", 404));
    }
    res.status(201).json({
      status: "success",
      data: {
        quiz,
      },
    });
  } catch (err) {
    next(err);
  }
};

//Delete Quiz
exports.deleteQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);

    if (!quiz) {
      return next(new customError("No Quiz with this ID exists!", 404));
    }
    res.status(204).json({
      status: "success",
      data: {},
    });
  } catch (err) {
    next(err);
  }
};

exports.evaluateQuiz = async (req, res, next) => {
  try {
    const quizId = req.params.id;
    const quiz = await Quiz.findById(quizId);
    const questions = req.body.questions;
    const markedAnswers = req.body.markedAnswers;
    const userId = req.user._id;

    const maxMarks = quiz.maxMarks;
    let marksScored = 0;
    let correctAnswers = 0;

    for (let i = 0; i < questions.length; i += 1) {
      const question = await Question.findById(questions[i]);

      if (markedAnswers[i] === question.answer) {
        marksScored += Math.round(maxMarks / quiz.numberOfQuestions);
        correctAnswers++;
      } else {
        marksScored -= quiz.negativeMarking;
      }
    }

    let percentage = ((marksScored / maxMarks) * 100).toFixed(2);

    const result = await Result.create({
      user: userId,
      quiz: quizId,
      marksScored,
      correctAnswers,
      attempted: questions.length,
      percentage,
      createdAt: Date.now(),
    });

    const resultMail = await Result.findById(result._id);
    await new Email(req.user, resultMail).send("resultMail");

    res.status(201).json({
      status: "success",
      data: {
        result,
      },
    });
  } catch (err) {
    next(err);
  }
};
