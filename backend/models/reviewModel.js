const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Review cannot be empty"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      message: ["Rating must be between 1 to 5"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: "Tour",
      required: [true, "Review must belong to a tour"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a user"],
    },
  },
  {
    // for virtual properties
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    // timestamp
    timestamps: true,
  },
);

reviewSchema.index({ tour: 1, user: 1 }, { unique: true }); // In this way, one user can give only one review for a particular tour

reviewSchema.statics.calcAverageRatings = async function (tourId) {
  const Tour = require("./tourModels");
  // static methods, used because aggregate works on current model. Instance method works on current cod and static for current model
  const stats = await this.aggregate([
    {
      $match: {
        tour: tourId,
      },
    },
    {
      $group: {
        _id: "$tour",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 4.5,
      ratingsAverage: 0,
    });
  }
};

reviewSchema.post("save", function () {
  this.constructor.calcAverageRatings(this.tour); // this.contructor is used instead of Review as Review is defined below
});

reviewSchema.pre("/^findOneAnd/", async function (next) {
  // This is query middleware in which this points to query and not document
  this.r = await this.findOne(); // This way we get the document
  next();
});
reviewSchema.post("findOneAnd", async function () {
  // We can't do this.findOne() here as we are in post,query has already been executed
  await this.r.constructor.calcAverageRatings(this.r.tour);
});
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
