const mongoose = require("mongoose");
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Tour must have a name"],
    unique: true,
    trim: true
  },
  duration:{
    type:Number,
    required:[true,"Tour must have a duration"]
  },
  maxGroupSize:{
    type:Number,
    required:[true,"Tour must have a group size"]
  },
  difficulty:{
    type:String,
    required:[true,"Tour must have a difficulty"]
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity:{
    type:Number,
    default:0
  },
  price: {
    type: Number,
    required: [true, "Tour must have a price"],
  },
  priceDiscount:{
    type:Number,
  },
  summary:{
    type:String,
    trim:true,
    required:[true,"Tour must have a summary"]
  },
  description:{
    type:String,
    trim:true
  },
  imageCover:{
    type:String,
    required:[true,"Tour must have a cover image"]
  },
  images:{
    type:[String]
  },
  createdAt:{
    type:Date,
    default:Date.now(),
    select:false // will not show in the data
  },
  startDates:{
    type:[Date]
  }
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
