const mongoose = require("mongoose");
const Question = require("./questionModel");

const quizSchema = new mongoose.Schema(
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
    numberOfQuestionsRandom: {
      type: Number,
      required: [
        true,
        "Please tell the number of questions to be displayed in a quiz",
      ],
    },
    questions: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Question",
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

quizSchema.pre("save", async function (next) {
  const quePromises = this.questions.map(
    async (id) => await Question.findById(id)
  );
  this.questions = await Promise.all(quePromises);
  next();
});

quizSchema.pre(/^find/, async function (next) {
  this.populate({
    path: "questions",
    select: "content options answer",
  });
  next();
});

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;
