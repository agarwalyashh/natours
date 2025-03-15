const express = require("express");
const morgan = require("morgan");
const AppError = require("./utils/error")
const errorController=require('./controllers/errorController')

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


// If we reach here, means no response was sent till now, therefore there might be somethign wrong with the route
app.all("*",(req,res,next)=>{
    // res.status(404).json({
    //     status:"fail",
    //     message:`Can't find original ${req.originalUrl} on this server`
    // })
    next(new AppError(`Can't find ${req.originalUrl} on this server`,404)) // whenever an argument is passed inside next, it directly calls error handler
})


app.use(errorController)
module.exports=app;