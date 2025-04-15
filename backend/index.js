const express = require("express");
const morgan = require("morgan");
const AppError = require("./utils/error");
const errorController = require("./controllers/errorController");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const emailRouter = require("./routes/emailRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const bookingRouter = require("./routes/bookingRoutes");

const app = express();

app.use(helmet());

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP. Please try again later.",
});
app.use("/api", limiter);

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
// app.use(express.static(`${__dirname}/public`)) middleware to serve static files , just give the directory in which the files are present
// and then hit the url in browser, it will work

app.use(mongoSanitize());
app.use(xss());
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(compression())
app.use((req, res, next) => {
  next();
});

app.use("/api/v1/tours", tourRouter); // Called Mounting a new router on a route(given url)
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/emails", emailRouter);
app.use("/api/v1/bookings", bookingRouter);

// If we reach here, means no response was sent till now, therefore there might be somethign wrong with the route
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404)); // whenever an argument is passed inside next, it directly calls error handler
});

app.use(errorController);
module.exports = app;
