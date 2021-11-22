const Subject = require("../Model/subjectModel");
const customError = require("../utils/customError");
const multer = require('multer');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    cb(null, true);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});


//Get one Subject by id
exports.getOneSubject = async (req, res, next) => {
  try {
    const subject = await Subject.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        subject,
      },
    });
  } catch (err) {
    next(err);
  }
};

//Get all subjects
exports.getAllSubjects = async (req, res, next) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json({
      status: "success",
      result: subjects.length,
      data: {
        subjects,
      },
    });
  } catch (err) {
    next(err);
  }
};

//Create Subject
exports.createSubject = async (req, res, next) => {
  try {
    const subject = await Subject.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        subject,
      },
    });
  } catch (err) {
    next(err);
  }
};

//Update Subject
exports.updateSubject = async (req, res, next) => {
  try {
    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    if (!subject) {
      return next(new customError("No subject with this ID exists!", 404));
    }
    res.status(201).json({
      status: "success",
      data: {
        subject,
      },
    });
  } catch (err) {
    next(err);
  }
};

//Delete Subject
exports.deleteSubject = async (req, res, next) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);

    if (!subject) {
      return next(new customError("No subject with this ID exists!", 404));
    }
    res.status(204).json({
      status: "success",
      data: {},
    });
  } catch (err) {
    next(err);
  }
};
