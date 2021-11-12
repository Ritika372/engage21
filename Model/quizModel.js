const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: "String",
      required: [true, "Quiz Name is required."],
    },
    description: {
      type: "String",
    },
    maxMarks: {
      type: Number,
      required: [true, "Please tell the maximum marks of the quiz"],
    },
    numberOfQuestions: {
      type: Number,
      required: [true, "Please tell the number of questions in the quiz"],
    },
    active: {
      type: Boolean,
      default: true,
    },
    questions: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Question",
        required: [true, "Question must belong to a quiz."],
      },
    ],
    subject: {
      type: mongoose.Schema.ObjectId,
      ref: "Subject",
      required: [true, "Quiz must belong to a subject"],
    },
  },
  {
    toJson: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;
