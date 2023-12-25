const { query } = require("express");
const AppError = require("../utils/appError");
// const Order = require("../models/orderModel");
const Product = require("./../models/productModel");
const APIFeatures = require('../utils/apiFeatures')
const catchAsync = require('../utils/catchAsync')

exports.aliasCheapProducts = catchAsync(async  (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage.price';
  req.query.fields = 'name,price,ratingsAverage,size';
  next()
});


exports.createProduct = catchAsync(async (req, res, next) => {
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        product: newProduct,
      },
    });
});

exports.getAllProducts = catchAsync(async (req, res, next) => {

  // EXECUTE QUERY 
  const features = new APIFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const products = await features.query

// Send response
  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    next(new AppError("No product found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    next(new AppError("No product found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
});

exports.searchProducts = catchAsync(async (req, res, next) => {
  const { keywords } = req.query;
  const results = await Product.find({
    $or: [
      { model: { $regex: keywords, $options: `i` } },
      // { price: { $regex: keywords, $options: `i` } },
    ],
  });
  res.status(200).json({
    status: "success",
    results: results.length,
    data: results,
  });
});

