const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('xss-clean')


const AppError = require("./utils/appError");
const globalErrorHandler = require("./Controllers/errorController");
const productRouter = require("./routes/productRoutes");
const orderRouter = require("./routes/orderRoutes");
const cartRouter = require("./routes/cartRoutes");
const userRouter = require("./routes/userRoutes");

// GLOBAL MIDDLEWARE
const app = express();

app.use(helmet())

//  Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit request for same api
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this Ip, please try again in an hour'
})
app.use('/api', limiter)

// Middlwares
app.use(morgan("dev"));

// Body parser reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against Nosql query injection
app.use(mongoSanitize());

// Data sanitization against xss
app.use(xss())

//Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next()
})

// Serving static files
app.use(express.static(`${__dirname}/public`))

// Test middleware
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
