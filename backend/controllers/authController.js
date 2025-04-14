const User = require("../models/userModels");
const AppError = require("../utils/error");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { render } = require("@react-email/render");
const resendKey = process.env.RESEND_API_KEY;
const { Resend } = require("resend");
const React = require("react");
const forgotPassword = require("../emails/forgotPassword");

const resend = new Resend(resendKey);

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm, // don't use req.body directly as anybody can then signin as admin
    });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    });
    newUser.password = undefined;
    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.cookie("jwt", "loggedOut", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
    res.status(200).json({ status: "success" });
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return next(new AppError("Please enter email and password", 400));

    const user = await User.findOne({ email: email }).select("+password"); // + is added as password select is set as false in schema

    if (!user || !(await user.correctPassword(password, user.password)))
      return next(new AppError("Incorrect credentials", 401));

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    });
    user.password = undefined;
    res.status(200).json({
      status: "success",
      token: token,
    });
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    // 1. Getting token & checking if it is there
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    )
      // We will pass header like this
      token = req.headers.authorization.split(" ")[1];
    else if (req.cookies.jwt) token = req.cookies.jwt;
    if (!token)
      return next(
        new AppError("You are not logged in! Please log in to get access", 401)
      );
    // 2. Verify the token
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
          reject(err);
        } else {
          resolve(decodedToken);
        }
      });
    }).catch((err) => {
      return next(new AppError("Invalid or expired token", 401, err));
    });
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError("The user belonging to this token does not exist", 401)
      );
    }

    if (currentUser.changedPasswordAfter(decoded.iat))
      // decoded payload has exp and iat along with one we passed(id)
      return next(
        new AppError("User recently changed password. Please Login Again.", 401)
      );
    req.user = currentUser;
    next();
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};

exports.isLoggedIn = async (req, res, next) => {
  try {
    if (!req.cookies.jwt) {
      return res.status(200).json({
        status: "success",
        isLoggedIn: false,
      });
    }

    const token = req.cookies.jwt;
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
          return reject(err);
        }
        resolve(decodedToken);
      });
    }).catch(() => {
      return null;
    });

    if (!decoded) {
      return res.status(200).json({
        status: "success",
        isLoggedIn: false,
      });
    }

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(200).json({
        status: "success",
        isLoggedIn: false,
      });
    }

    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return res.status(200).json({
        status: "success",
        isLoggedIn: false,
      });
    }

    return res.status(200).json({
      status: "success",
      isLoggedIn: true,
      user: currentUser,
    });
  } catch (err) {
    return res.status(200).json({
      status: "success",
      isLoggedIn: false,
    });
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next(); // Since no async await is needed here, no try-catch
  };
};

exports.forgotPassword = async (req, res, next) => {
  try {
    // 1. Get user based on POSTed email
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return next(new AppError("No user with that email exists!", 404));

    // 2. Generate the random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
    // 3. Send it to user's email
    const resetURL = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;
    try {
      const html = await render(
        React.createElement(forgotPassword, {
          userFirstname: user.name.split(" ")[0],
          resetPasswordLink: resetURL,
        })
      );
      await resend.emails.send({
        from: "onboarding@resend.dev", // must be verified in Resend
        to: ["agarwalyashhh004@gmail.com"],
        subject: "Reset your password",
        html,
      });

      res.status(200).json({
        status: "success",
        message: "Reset token sent to email!",
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      return next(new AppError("There was an error!", 500));
    }
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    // 1. Get User based on token
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    // 2. If token has not expired and user exists, set new password
    if (!user)
      return next(new AppError("Token has expired or is invalid", 400));
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // 3. Update changedPasswordAt property

    // 4. Log user in, send JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    });
    user.password = undefined;
    res.status(200).json({
      status: "success",
      token: token,
    });
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    // 1. Get User
    const user = await User.findById(req.user.id).select("+password");

    // 2. Check if POSTed current password is correct
    const currentPassword = req.body.passwordCurrent;
    if (!(await user.correctPassword(currentPassword, user.password)))
      return next(new AppError("Incorrect password", 401));

    // 3. Update Password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    // 4. Log user in, send JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    });
    user.password = undefined;
    res.status(200).json({
      status: "success",
      token: token,
    });
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};
