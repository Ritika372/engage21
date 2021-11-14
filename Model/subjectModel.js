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
  },
  {
    toJson: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// virtual populate
subjectSchema.virtual("quizzes", {
  ref: "Quiz",
  foreignField: "subject",
  localField: "_id",
});

const Subject = mongoose.model("Subject", subjectSchema);
module.exports = Subject;
