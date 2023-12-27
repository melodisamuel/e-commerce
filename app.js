const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./Controllers/errorController");
const productRouter = require("./routes/productRoutes");
const orderRouter = require("./routes/orderRoutes");
const cartRouter = require("./routes/cartRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// Global middleware for logging development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}


// Middlwares
app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next()
})

// Routes
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`cant't find ${req.originalUrl} on this server!`));
});

app.use(globalErrorHandler);

module.exports = app;
