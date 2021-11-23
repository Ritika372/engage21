const Subject = require("../Model/subjectModel");
const customError = require("../utils/customError");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const mongoose = require("mongoose");
const crypto = require("crypto");
const path = require("path");

const db = process.env.DATABASE;

const storage = new GridFsStorage({
  url: db,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "files",
        };
        resolve(fileInfo);
      });
    });
  },
});

const store = multer({
  storage,
});

exports.uploadNotes = (req, res, next) => {
  const upload = store.single("filename");
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).send("File too large");
    } else if (err) {
      return res.sendStatus(500);
    }
    next();
  });
};

exports.uploadNotes = store.single("filename");

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
    if (req.file) {
      const subject = await Subject.findById(req.params.id);
      newNotes = {
        filename: req.file,
        name: req.body.notesname,
        id: req.file.id,
      };
      let notes = [];
      if (!subject.notes) {
        notes.push(newNotes);
        req.body.notes = notes;
      } else {
        notes = subject.notes;
        notes.push(newNotes);
        req.body.notes = notes;
      }
      req.body.notesname = undefined;
    }
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
