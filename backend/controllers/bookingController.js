const AppError = require("../utils/error");
const Booking = require("../models/bookingModel");
exports.createBooking = async (req, res, next) => {
  try {
    const newBooking = await Booking.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        booking: newBooking,
      },
    });
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};

exports.getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json({
      status: "success",
      data: {
        bookings: bookings,
      },
    });
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};
