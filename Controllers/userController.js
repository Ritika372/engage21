const User = require("../Model/userModel");

//Get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      result: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    next(err);
  }
};

//Get a single user by ID
exports.getUser = async (req, res, next) => {
  try {
    const user = User.findById(req.user._id);
    if (!user) {
      return next(new customError("User doens't exist.", 400));
    }
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getOneUser = async (req, res, next) => {
  try {
    const user = User.findById(req.params.id);
    if (!user) {
      return next(new customError("User doens't exist.", 400));
    }
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

//Update user details (NOT FOR UPDATING PASSWORD)
exports.updateUser = async (req, res, next) => {
  try {
    //update user data
    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    next(err);
  }
};

//DELETING the user by ID
exports.deleteUser = async (req, res, next) => {
  //setting the active property of user false.
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      { active: false },
      { new: true }
    );

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
