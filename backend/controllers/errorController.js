const AppError=require("../utils/error")
function handleCastErrorDB(err){
    const message=`Invalid value`
    return new AppError(message,400)
}
function handleDuplicateFields(err){
    const message=`Duplaicate field value.Please use a different value`
    return new AppError(message,400)
}
function handleValidationErrorDB(err){
    const message="Invalid input data"
    return new AppError(message,400)
}
function handleJWTError(err){
  return new AppError("Invalid Token. Please Login Again",401)
}
function handleExpiredError(err){
  return new AppError("Please Login Again",401)
}
module.exports = (err, req, res, next) => {
  // Middleware for error handling automatically detected by express
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    console.log(err);
    
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error:err,
        stack:err.stack
    });
  } else if (process.env.NODE_ENV === "production") {
    let error={...err}
    if (err.name === "CastError") {
      error = handleCastErrorDB(err);
    }
    if(err.name=== "MongoServerError"){
        error=handleDuplicateFields(err);
    }
    if(err.name==="ValidationError"){
        error=handleValidationErrorDB(err);
    }
    if(err.name==="JsonWebTokenError"){
      error=handleJWTError(err);
  }
  if(err.name==="TokenExpiredError"){
    error=handleExpiredError(err);
}
    if (error.isOperational) {
      // errors which we have handled, and we know about them(isOperational is updated inside AppError)
      res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      });
    } else {
      //Programming or unknown error
      console.error("Error:", err);
      res.status(500).json({
        status: "error",
        message: "Something went wrong!",
      });
    }
  }
};
