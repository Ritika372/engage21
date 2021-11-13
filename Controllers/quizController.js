const Quiz = require("../Model/quizModel");
const customError = require("../utils/customError");

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
