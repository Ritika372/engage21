const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  content: {
    type: "String",
    required: [true, "Quiz Name is required."],
  },
  options: {
    type: Array,
  },
  answer: {
    type: String,
    required: [true, "Please provide an answer."],
  },
  quiz: {
    type: mongoose.Schema.ObjectId,
    ref: "Subject",
    required: [true, "Question must belong to a quiz."],
  },
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
