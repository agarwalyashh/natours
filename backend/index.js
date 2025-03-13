const express = require("express");
const morgan = require("morgan");

const tourRouter=require('./routes/tourRoutes')
const userRouter=require('./routes/userRoutes')

const app = express();

if(process.env.NODE_ENV==="development")
app.use(morgan("dev"));

app.use(express.json());
// app.use(express.static(`${__dirname}/public`)) middleware to serve static files , just give the directory in which the files are present
// and then hit the url in browser, it will work

app.use("/api/v1/tours", tourRouter); // Called Mounting a new router on a route(given url)
app.use("/api/v1/users", userRouter);

module.exports=app;