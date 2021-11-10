const User = require("../Model/userModel");

exports.getUser = (req,res,next) => {
    try{
        const user = User.findById(req.user._id);
        if(!user) {
            //return error
        }

        res.status(200).json({
            status: 'success',
            data : {
                user
            }
        })
    } catch(err) {
        next(err);
    }
}

exports.updateMe = async (req, res, next) => {
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

exports.deleteMe = async (req, res, next) => {
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
