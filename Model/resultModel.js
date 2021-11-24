const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    quiz: {
      type: mongoose.Schema.ObjectId,
      ref: "Quiz",
      required: [true, "Result must belong to a Quiz"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Result must belong to a user"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    marksScored: {
      type: Number,
      required: [true, "Result must have a Score"],
    },
    correctAnswers: {
      type: Number,
      required: [true, "Result must have number of correct answers."],
    },
    attempted: {
      type: Number,
      required: [true, "Result must have number of attempted questions"],
    },
    percentage: {
      type: Number,
      required: [true, "Result must have a percentage value"],
    },
  },
  {
    toJson: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//populating quiz and user when a "find" query will be there for result. 
resultSchema.pre(/^find/, async function (next) {
  this.populate({
    path: "quiz",
    select: "-questions",
  });
  this.populate({
    path: "user",
    select: "firstName lastName",
  });
  next();
});

const Result = mongoose.model("Result", resultSchema);
module.exports = Result;
