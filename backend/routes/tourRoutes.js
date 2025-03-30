const express = require("express");
const authController = require("../controllers/authController");
const tourController = require("../controllers/tourController");
const reviewRouter = require("../routes/reviewRoutes");
const router = express.Router();

// router.param('id',tourController.checkID)
router
  .route("/top-5-cheap")
  .get(tourController.alias, tourController.getAllTours); // Aliasing the route
router.route("/tour-stats").get(tourController.getTourStats);
router
  .route("/tours-within/:distance/center/:latlng/unit/:unit")
  .get(tourController.getToursWithin);
router.route("/distances/:latlng").get(tourController.getDistances);
router
  .route("/monthly-plan/:year")
  .get(
    authController.protect,
    authController.restrictTo("admin", "lead-guide", "guide"),
    tourController.getMonthlyPlan
  );
router
  .route("/:id")
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.deleteTour
  );
router
  .route("/")
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.createTour
  );
// .post(tourController.checkBody,tourController.createTour); //checkBody is a middleware

router.use("/:tourId/reviews", reviewRouter);
module.exports = router;
