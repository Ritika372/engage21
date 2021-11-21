const User = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const customError = require("../utils/customError");

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
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return next(new customError("User already exists! Please log in.", 409));
    }

    //While signing up, user cannot assign himself as ADMIN.
    if (req.body.role === "admin") req.body.role = undefined;

    const newUser = await User.create(req.body);

    //after signing in, the user should be logged in also
    sendJWTToken(newUser, 201, res);
  } catch (err) {
    next(err);
  }
};

//Logging the user
exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      return next(new customError("Please enter email and password!", 400));
    }
    const user = await User.findOne({ email }).select("password");

    //If email or password doesn't match
    if (!user || !(await user.passwordMatch(password, user.password))) {
      return next(new customError("Invalid login credentials!", 401));
    }

    sendJWTToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

//Protecting the routes from unauthorized users
exports.protect = async (req, res, next) => {
  try {
    //Checking if the token exists in the cookie or in authorization header.
    let token = "";
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(
        new customError("You are not logged in! Please login first", 401)
      );
    }
    //verifying the token obtained from the request
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    //check if user still exists
    const currUser = await User.findById(decoded.id);
    if (!currUser) {
      return next(
        new customError(
          "The user belonging to this token no longer exists",
          400
        )
      );
    }

    //GRANTING ACCESS TO PROTECTED ROUTE
    req.user = currUser;
    res.locals.user = currUser;
    next();
  } catch (err) {
    next(err);
  }
};

//Restricting routes to admin only
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new customError("Permission not granted", 403));
    }
    next();
  };
};

exports.logout = async (req, res, next) => {
  try {
    res.cookie("jwt", "loggedOut", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
    res.status(200).json({ status: "success" });
  } catch (err) {
    next(err);
  }
};
