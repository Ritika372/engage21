const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter your first name."],
  },
  lastName: {
    type: String,
    required: [true, "Please enter your last name."],
  },
  email: {
    type: String,
    required: [true, "Please enter your email."],
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
    required: [true, "Please enter a password with more than 8 characters."],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm the password"],
    validate: {
      validator: function (ele) {
        return ele === this.password;
      },
      message: "Passwords doesn't match",
    },
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

//DOCUMENT MIDDLEWARES

//Will run everytime a new user is created.
//Used for hashing the password.
UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = undefined;
  next();
});

//Match the user password with the password entered by the user while logging in.
UserSchema.methods.passwordMatch = async function (
  enteredPassword,
  userPassword
) {
  return await bcrypt.compare(enteredPassword, userPassword);
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
