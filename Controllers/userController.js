const User = require("../Model/userModel");

//Get all users
exports.getAllUsers = async(req,res,next) => {
    try{
        const users = await User.find();
        res.status(200).json({
            status: "success",
            result: users.length,
            data: {
                users
            }
        });
    }
    catch (err) {
        console.log(err);
    }
}

//Get a single user by ID
exports.getUser = async(req,res,next) => {
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
        console.log(err);
    }
}


//Update user details (NOT FOR UPDATING PASSWORD)
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
    console.log(err);
  }
};

//DELETING the user by ID
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
    console.log(err);
  }
};
