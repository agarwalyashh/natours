const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const router = express.Router();

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/isLoggedIn").get(authController.isLoggedIn);
router.route("/logout").get(authController.logout);
router.route("/forgotPassword").post(authController.forgotPassword);
router.route("/resetPassword/:token").patch(authController.resetPassword);

router.use(authController.protect); // After this all routes are protected as this is a middleware

router.route("/updateMyPassword").patch(authController.updatePassword);
router.route("/updateMe").patch(userController.uploadUserPhoto,userController.resizeUpserPhoto,userController.updateMe);
router.route("/deleteMe").delete(userController.deleteMe);
router.route("/getMe").get(userController.getMe);

router.use(authController.restrictTo("admin"));

router.route("/").get(userController.getAllUsers);
router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
module.exports = router;
