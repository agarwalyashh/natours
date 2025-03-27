const AppError = require("../utils/error");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};

exports.updateMe = async (req, res, next) => {
  try {
    // 1. Create error if user tries to update password
    if (req.body.password || req.body.passwordConfirm)
      return next(
        new AppError("Please use /updateMyPassword to update pasword", 400)
      );
    // 2. Update user data
    const filteredBody = filterObj(req.body, "name", "email");
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      { new: true, runValidators: true }
    );
    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};

exports.deleteMe = async (req,res,next)=>{
  try{
    const User = await User.findByIdAndUpdate(req.user.id,{active:false});
    res.status(204).json({
      status:"success",
      data:null
    })

  }
  catch(err){
    next(new AppError(err.message, 400, err));
  }
}