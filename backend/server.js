const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./index");


process.on("uncaughtRejection", (err) => {
  console.log("UNCAUGHT REJECTION! Shutting down...");
  console.log(err.name, err.message);
    process.exit(1);
});

// app.get("env") = development by default
// process.env -> lots of env variables set by nodejs by default

password = process.env.DATABASE_PASSWORD;
DB = process.env.DATABASE.replace("<PASSWORD>", password);
mongoose
  .connect(DB)
  .then((connection) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error.message);
  });

const port = process.env.PORT || 3000;
const server=app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
