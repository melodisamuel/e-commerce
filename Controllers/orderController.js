const Order = require("../models/orderModel");
const AppError = require("../utils/appError");
const catchAsync = require('../utils/catchAsync')


exports.createOrder = catchAsync(async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json({
      status: "success",
      data: newOrder,
    });
  } catch (error) {
    next(error);
  }
});

exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find();
  res.status(200).json({
    status: "success",
    results: orders.length,
    data: {
      orders,
    },
  });
});

exports.getOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    next(new AppError("No product found with that id", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!order) {
    next(new AppError("No product found with that id", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) {
    next(new AppError("No product found with that id", 404));
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
});
