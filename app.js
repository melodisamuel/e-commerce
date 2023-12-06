const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const productRouter = require("./routes/productRoutes");

const app = express();

// Global middleware for logging development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Middlwares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/v1/products", productRouter);

module.exports = app;
