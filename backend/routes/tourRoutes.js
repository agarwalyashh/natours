const express = require("express");
const authController = require("../controllers/authController");
const tourController = require("../controllers/tourController");
const router = express.Router();

// router.param('id',tourController.checkID)
router.route('/top-5-cheap').get(tourController.alias,tourController.getAllTours);  // Aliasing the route
router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan)
router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(authController.protect,authController.restrictTo('admin','lead-guide'),tourController.deleteTour);
router
  .route("/")
  .get(authController.protect,tourController.getAllTours)
  .post(tourController.createTour)
  // .post(tourController.checkBody,tourController.createTour); //checkBody is a middleware
module.exports = router;
