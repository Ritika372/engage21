const Question = require("../Model/questionModel");
const customError = require("../utils/customError");

//Get one question by id
exports.getOneQuestion = async (req, res, next) => {
  try {
    const filter = {};
    if (req.params.quizId) filter = { quiz: req.params.quizId };
    const question = await Question.findById(req.params.id, filter);
    if (!question) {
      return next(new customError("No Question with this ID exists!", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        question,
      },
    });
  } catch (err) {
    next(err);
  }
};

//Get all questions
exports.getAllQuestion = async (req, res, next) => {
  try {
    const filter = {};
    if (req.params.id) filter = { quiz: req.params.id };

    const question = await Question.find(filter);
    if (!question) {
      return next(new customError("No Question with this ID exists!", 404));
    }
    res.status(200).json({
      status: "success",
      result: question.length,
      data: {
        question,
      },
    });
  } catch (err) {
    next(err);
  }
};

//Create question
exports.createQuestion = async (req, res, next) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        question,
      },
    });
  } catch (err) {
    next(err);
  }
};

//Update question
exports.updateQuestion = async (req, res, next) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    if (!question) {
      return next(new customError("No question with this ID exists!", 404));
    }
    res.status(201).json({
      status: "success",
      data: {
        question,
      },
    });
  } catch (err) {
    next(err);
  }
};

//Delete question
exports.deleteQuestion = async (req, res, next) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);

    if (!question) {
      return next(new customError("No question with this ID exists!", 404));
    }
    res.status(204).json({
      status: "success",
      data: {},
    });
  } catch (err) {
    next(err);
  }
};
