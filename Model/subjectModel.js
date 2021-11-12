const mongoose = require("mongoose");
const Quiz = require("./quizModel");

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: "String",
      required: [true, "Subject Name is required."],
    },
    description: {
      type: "String",
    },
    quiz: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Quiz",
        required: [true, "Quiz must belong to a subject."],
      },
    ],
  },
  {
    toJson: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Subject = mongoose.model("Subject", subjectSchema);
module.exports = Subject;
