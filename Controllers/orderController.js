const Order = require("../models/orderModel");
const AppError = require("../utils/appError");

exports.createOrder = async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json({
      status: "success",
      data: newOrder,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllOrders = async (req, res, next) => {
  const orders = await Order.find();
  res.status(200).json({
    status: "success",
    results: orders.length,
    data: {
      orders,
    },
  });
};

exports.getOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
};

exports.updateOrder = async (req, res, next) => {
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
};

exports.deleteOrder = async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) {
    next(new AppError("No product found with that id", 404));
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
};
