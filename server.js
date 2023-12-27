const mongoose = require("mongoose");
const dotenv = require("dotenv");



process.on('uncaughtException', err => {
  console.log('UNACAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1)

})

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


process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  server.close(() => {
    process.exit(1)
  })
})