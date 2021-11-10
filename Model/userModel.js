const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Name is required."],
  },
  lastName: {
    type: String,
    required: [true, "Name is required."],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: "This is not a valid email! Please try again.",
    },
  },
  phone: {
    type: Number,
    required: false,
  },
  role: {
    type: String,
    enum: ["student", "admin"],
    default: "student",
  },
  password: {
    type: String,
    required: [true, "A password is required"],
    minlength: 8,
    select: false,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;