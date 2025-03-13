const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./index");

// app.get("env") = development by default
// process.env -> lots of env variables set by nodejs by default

password = process.env.DATABASE_PASSWORD;
DB = process.env.DATABASE.replace("<PASSWORD>", password);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((connection) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error.message);
  });

const tourSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,"Tour must have a name"],
    unique:true
  },
  rating:{
    type:Number,
    default:4.5
  },
  price:{
    type:Number,
    required:[true,"Tour must have a price"]
  }
})

const Tour=mongoose.model("Tour",tourSchema)

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
