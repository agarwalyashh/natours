const mongoose = require("mongoose");
const slugify = require("slugify");
const Review = require("./reviewModel");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tour must have a name"],
      unique: true,
      trim: true,
      maxLength: [
        30,
        "Tour name must have less than or equal to 30 characters",
      ],
    },
    slug: {
      type: String,
    },
    duration: {
      type: Number,
      required: [true, "Tour must have a duration"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "Tour must have a group size"],
    },
    difficulty: {
      type: String,
      required: [true, "Tour must have a difficulty"],
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "Difficulty must be easy,medium or difficult",
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Ratings must be between 1 to 5"],
      max: [5, "Ratings must be between 1 to 5"],
      set: (val) => val.toFixed(2),
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Tour must have a price"],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // NOTE - this keyword here works only for creating and not updating (by Mongoose)
          if (this.price < priceDiscount) return false;
          return true;
        },
        message: "Discount price must be less than the actual price",
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, "Tour must have a summary"],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "Tour must have a cover image"],
    },
    images: {
      type: [String],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false, // will not show in the data
    },
    startDates: {
      type: [Date],
    },
    secretTour: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      // GeoJSON
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    location: [
      // Using an array, creates a new document inside the parent document (embedding)
      {
        type: {
          type: String,
          default: "Point",
          enum: ["Point"],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    // guides:{
    //   type: Array
    // } // For embeddings
    // Child Referencing
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    // for virtual properties
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// tourSchema.index({price:1}) // sort price in ascending order. Indexing helps in improving read performance
tourSchema.index({ price: 1, ratingsAverage: -1 }); //Compound Index
tourSchema.index({ slug: 1 });
tourSchema.index({ startLocation: "2dsphere" });

// MONGOOSE MIDDLEWARE-->

// pre & post DOCUMENT middleware runs before the .save() and .create()
tourSchema.pre("save", function (next) {
  // console.log(this); // this is the entire object sent as a post request before the document is saved into the database
  this.slug = slugify(this.name, { lower: true });
  next();
});

// We perform embeddings like this:

// tourSchema.pre("save",async function(next){
//   const guidesPromises = this.guides.map(async (id)=> await User.findById(id))
//   this.guides = await Promise.all(guidesPromises)
//   next()
// })

// tourSchema.post('save',function(doc,next){
//   console.log(doc); // doc is the entire object after the document is saved into the database
//   next()
// })

// Query Middleware-
tourSchema.pre("find", function (next) {
  this.find({ secretTour: { $ne: true } }); // here, the this keyword points to the query which is going to be executed
  next();
});
tourSchema.pre("findOne", function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

//Aggregation middleware-
// tourSchema.pre("aggregate", function (next) {
//   this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
//   next();
// });

tourSchema.virtual("durationInWeeks").get(function () {
  // virtual properties are not stored in databases. These are properties which can
  // be easily found out with the help of existing ones
  return this.duration / 7;
});

// Virtual Populate - doesnt actually store in the database but we can still reference
tourSchema.virtual("reviews", {
  ref: Review,
  foreignField: "tour",
  localField: "_id",
});

const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;

// Creating a document-->
// const testTour=new Tour({
//     name:"The Park Camper",
//     price:997
//   })

//   testTour.save().then((doc)=>{
//     console.log(doc);

//   }).catch((err)=>console.log(err.message));

// OR--> Use Tour.create({})
