const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

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
