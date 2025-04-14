const AppError = require("../utils/error");
const Review = require("../models/reviewModel");
exports.getAllReviews = async (req, res, next) => {
  try {
    let filter={};
    if (req.params.tourId) filter = { tour: req.params.tourId };
    const query = { ...req.query };
    if(Object.keys(query).length > 0)
    {
        let queryStr = JSON.stringify(query);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        queryObj = JSON.parse(queryStr);
        Object.assign(filter, queryObj);
    }
    const reviews = await Review.find(filter)
      .populate({
        path: "user",
        select: "name photo",
      })
      .populate({
        path: "tour",
        select: "name",
      });
    res.status(200).json({
      status: "success",
      data: {
        reviews: reviews,
      },
    });
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};

exports.createReview = async (req, res, next) => {
  try {
    if (!req.body.tour) req.body.tour = req.params.tourId; // If no id is specified, take the one from the url
    if (!req.body.user) req.body.user = req.user.id; // req.user comes from the protect middleware
    const review = await Review.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        review: review,
      },
    });
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const reviewId = req.params.id;
    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) return next(new AppError("Review not found", 404));
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};

exports.updateReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!review) return next(new Error("Review not found", 404));
    res.status(200).json({
      status: "success",
      data: {
        review: review,
      },
    });
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};

exports.getReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id).populate({
      path: "user",
      select: "name id",
    });
    if (!review) return next(new AppError("Review not found", 404));
    res.status(200).json({
      status: "success",
      review: review,
    });
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};
