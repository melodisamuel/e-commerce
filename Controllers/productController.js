const { query } = require("express");
const AppError = require("../utils/appError");
// const Order = require("../models/orderModel");
const Product = require("./../models/productModel");

exports.createProduct = async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        product: newProduct,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllProducts = async (req, res, next) => {
  // 1. FIltering
  const queryObj = { ...req.query };
  const excludeFields = ["page", "sort", "limit", "fields"];
  excludeFields.forEach((el) => delete queryObj[el]);

  // . Advanced filtering
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  console.log(JSON.parse(queryStr));

  let query = Product.find(queryObj);

  // 2. sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    console.log(sortBy);
    query = query.sort(sortBy);
    // sort('price')
  } else {
    query = query.sort("-createdAt");
  }

  const products = await query;
  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
};

exports.getProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
};

exports.updateProduct = async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!product) {
    next(new AppError("No product found with that ID", "404"));
  }
  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
};

exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    next(new AppError("No product found with that ID", "404"));
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
};

exports.searchProducts = async (req, res, next) => {
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
};

//
