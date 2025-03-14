const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./index");

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
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
