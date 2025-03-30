const AppError = require("../utils/error");
const User = require("../models/userModels");
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.getAllUsers = async (req,res,next)=>{
  try{
    const users = await User.find()
    res.status(200).json({
      status:"success",
      data:{
        users:users
      }
    })
  }
  catch(err){
    next(new AppError(err.message,400,err))
  }
}

exports.getUser = async (req, res,next) => {
  try{
    const user = await User.findById(req.params.id)
    if(!user) return next(new AppError("User not found", 404));
    res.status(200).json({
      status:"success",
      data:{
        user:user
      }
    })
  }
  catch(err){
    next(new AppError(err.message, 400, err));
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return next(new AppError("User not found", 404));
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};
exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) return next(new Error("User not found", 404));
    res.status(200).json({
      status: "success",
      data: {
        user: user,
      },
    });
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
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

exports.deleteMe = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, { active: false });
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};

exports.getMe = async (req,res,next)=>{
  try{
    const user = await User.findById(req.user.id)
    if(!user)
      return next(new AppError("User doesn't exist",404))
    res.status(200).json({
      status:"success",
      data:{
        user:user
      }
    })
  }
  catch(err){
    next(new AppError(err.message, 400, err));
  }
}