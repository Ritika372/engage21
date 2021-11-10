const User = require("../Model/userModel");
const jwt = require("jsonwebtoken");

const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendJWTToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  //sending jwt in a cookie that will be stored in user's local storage
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000 //converting into milliseconds
    ),
    httpOnly: true,
    secure: true,
  };

  res.cookie("jwt", token, cookieOptions);

  //NEVER display the password in response.
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

//Registering the user
exports.signUp = async (req, res, next) => {
  try {
    //check if user already exists
    const user = await User.findOne({ email : req.body.email });
    if(user) {
      console.log("User already exists!");
      return;
    }

    //While signing up, user cannot assign himself as ADMIN.
    if (req.body.role === "admin") req.body.role = undefined;

    const newUser = await User.create(req.body);

    //after signing in, the user should be logged in also
    sendJWTToken(newUser, 201, res);
  } catch (err) {
    console.log(err);
  }
};
