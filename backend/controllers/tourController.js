const Tour = require("./../models/tourModels");
const AppError = require("../utils/error");

exports.alias = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  next();
};

exports.createTour = async (req, res, next) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    next(new AppError(err.message, 400, err));
    // so whenever an error occurs, catch block is executed, which calls next with instance of AppError which extends Error class and fills in the data, and then the error middleware is executed which calls the errorController and sends the response
  }
};

exports.getTour = async (req, res, next) => {
  try {
    const tour = await Tour.findById(req.params.id)
      .populate({
        path: "guides",
        select: "-__v -passwordChangedAt",
      })
      .populate({
        path: "reviews",
        select: "review rating",
      }); // populate helps to get data inside the parent document. Looks like embedding but it might not be
    if (!tour) return next(new Error("Tour not found", 404));
    res.status(200).json({
      status: "success",
      data: {
        tour: tour,
      },
    });
  } catch (err) {
    next(new AppError(err.message, 404, err));
  }
};
exports.getAllTours = async (req, res, next) => {
  try {
    const queryObj = { ...req.query };
    const exclude = ["page", "sort", "limit", "fields"];
    exclude.forEach((field) => delete queryObj[field]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Tour.find(JSON.parse(queryStr)).populate({
      path: "guides",
      select: "-__v -passwordChangedAt",
    });

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("createdAt");
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v"); // adding '-' in front excludes that field
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip > numTours) throw new Error("Page doesn't exist");
    }

    // const tours = await query.explain(); // explain is to get statistics
    const tours = await query;
    res.status(200).json({
      status: "success",
      data: {
        tours: tours,
      },
    });
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};
exports.updateTour = async (req, res, next) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!tour) return next(new Error("Tour not found", 404));
    res.status(200).json({
      status: "success",
      data: {
        tour: tour,
      },
    });
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};
exports.deleteTour = async (req, res, next) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) return next(new Error("Tour not found", 404));
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

exports.getTourStats = async (req, res, err) => {
  try {
    const stats = await Tour.aggregate([
      //Creates a pipeline
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          // _id:null, // group on basis of no particular field
          _id: "$difficulty",
          numTours: { $sum: 1 },
          numRatings: { $sum: "$ratingsQuantity" },
          avgRating: { $avg: "$ratingsAverage" },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
      {
        $sort: {
          avgPrice: 1,
        },
      },
      // {
      //   $match:{
      //     _id:{$ne:"easy"}
      //   }
      // }
    ]);
    res.status(200).json({
      status: "success",
      data: {
        stats,
      },
    });
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = Number(req.params.year);
    const plan = await Tour.aggregate([
      {
        $unwind: "$startDates",
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$startDates" },
          numTourStarts: { $sum: 1 },
          tours: { $push: "$name" },
        },
      },
      {
        $addFields: { month: "$_id" },
      },
      {
        $project: {
          _id: 0, // it will not show up in response
        },
      },
      {
        $sort: {
          numTourStarts: -1,
        },
      },
    ]);
    res.status(200).json({
      status: "success",
      data: {
        plan,
      },
    });
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

exports.getToursWithin = async (req, res, next) => {
  try {
    const { distance, latlng, unit } = req.params;
    const [lat, lng] = latlng.split(",");

    if (!lat || !lng)
      return next(
        new AppError(
          "Please provide latitude and longitude in format 31.456,-334.23",
          400
        )
      );
    const radius = unit === "miles" ? distance / 3963.2 : distance / 6378.1;
    const tours = await Tour.find({
      startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
    });
    res.status(200).json({
      status: "success",
      data: {
        tours: tours,
      },
    });
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};

exports.getDistances = async (req, res, next) => {
  try {
    const { distance, latlng, unit } = req.params;
    const [lat, lng] = latlng.split(",");

    if (!lat || !lng)
      return next(
        new AppError(
          "Please provide latitude and longitude in format 31.456,-334.23",
          400
        )
      );
    const distances = await Tour.aggregate([
      {
        $geoNear: { // since in our index we have already defined startLocation as 2dsphere (and there is only 1 such field, geoNear automatically will take that)
          near: {
            type:"Point",
            coordinates:[Number(lng),Number(lat)]
          },
          distanceField: "distance", // by default in metres
          distanceMultiplier: 0.001
        }
      },
      {
        $project:{
          distance: 1,
          name: 1
        }
      }
    ])

    res.status(200).json({
      status: "success",
      data: {
        distances: distances,
      },
    })
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};
