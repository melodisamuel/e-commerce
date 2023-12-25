const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

// Connect to monogodb
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {}).then(() => console.log("DB connection successful"));

// Server
const port = process.env.PORT || 8000;
const host = "localhost";

const server = app.listen(port, host, () => {
  console.log(`App running on ${port}...`);
});


