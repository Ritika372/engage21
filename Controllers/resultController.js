const Result = require("../Model/resultModel");
const customError = require("../utils/customError");

//Get one Result by id
exports.getOneResult = async (req, res, next) => {
  try {
    const result = await Result.findById(req.params.id);
    if (!result) {
      return next(new customError("No Result with this ID exists!", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        result,
      },
    });
  } catch (err) {
    next(err);
  }
};

//Get all Results
exports.getAllResults = async (req, res, next) => {
  try {
    const results = await Result.find();
    res.status(200).json({
      status: "success",
      result: results.length,
      data: {
        results,
      },
    });
  } catch (err) {
    next(err);
  }
};

//Create Result
exports.createResult = async (req, res, next) => {
  try {
    const result = await Result.create(req.body);
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

//Update Result
exports.updateResult = async (req, res, next) => {
  try {
    const result = await Result.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    if (!result) {
      return next(new customError("No Result with this ID exists!", 404));
    }
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

//Delete Result
exports.deleteResult = async (req, res, next) => {
  try {
    const result = await Result.findByIdAndDelete(req.params.id);

    if (!result) {
      return next(new customError("No Result with this ID exists!", 404));
    }
    res.status(204).json({
      status: "success",
      data: {},
    });
  } catch (err) {
    next(err);
  }
};
