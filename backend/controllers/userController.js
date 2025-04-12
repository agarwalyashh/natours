const AppError = require("../utils/error");
const multer = require("multer");
const sharp = require("sharp");
const User = require("../models/userModels");

// const multerStorage = multer.diskStorage({
//   destination: (req, file, callbackfn) => {
//     callbackfn(null, "frontend/public/img/users");
//   },

//   filename: (req, file, callbackfn) => {
//     const ext = file.mimetype.split("/")[1];
//     const filename = `user-${req.user.id}-${Date.now()}.${ext}`;
//     callbackfn(null, filename);
//   },
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, callbackfn) => {
  if (file.mimetype.startsWith("image")) {
    callbackfn(null, true);
  } else {
    callbackfn(
      new AppError("Not an image! Please upload only images", 400),
      false
    );
  }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadUserPhoto = upload.single("photo");
// For multiple images:
// exports.uploadUserPhoto = upload.fields([
//   { name: "imageCover", maxCount: 1 },
//   {name:"images",maxCount: 3}
//  ])

// If we do need multiple images but only for one field-> upload.array(images,3) //(name,maxCount)
// And they produce req.files property unlike req.file for single image
exports.resizeUpserPhoto = async (req, res, next) => {
  try {
    if (!req.file) return next();
    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`frontend/public/img/users/${req.file.filename}`); // buffer because we are storing image not in disk but in memory
    next();
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      data: {
        users: users,
      },
    });
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(new AppError("User not found", 404));
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
    if (req.file) filteredBody.photo = req.file.filename;
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
    const user = await User.findByIdAndDelete(req.user.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return next(new AppError("User doesn't exist", 404));
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
