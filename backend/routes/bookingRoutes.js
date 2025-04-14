const express = require("express")
const authController = require("../controllers/authController")
const bookingController = require("../controllers/bookingController")

const router = express.Router()

router.route("/:tourId").post(authController.protect,bookingController.createBooking)
router.route("/").get(authController.protect,bookingController.getBookings)


module.exports = router