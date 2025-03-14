const express = require("express");
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
  .delete(tourController.deleteTour);
router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour)
  // .post(tourController.checkBody,tourController.createTour); //checkBody is a middleware
module.exports = router;
