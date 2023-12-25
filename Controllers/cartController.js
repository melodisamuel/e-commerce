const Cart = require("../models/cartModel");
const AppError = require("../utils/appError");
const catchAsync = require('../utils/catchAsync')


exports.createCart = catchAsync(async (req, res, next) => {
  try {
    const newCart = await Cart.create(req.body);
    res.status(201).json({
      status: "success",
      data: newCart,
    });
  } catch (error) {
    next(error);
  }
});

exports.getCartHistory = catchAsync(async (req, res, next) => {
  const carts = await Cart.find();
  res.status(200).json({
    message: "success",
    results: carts.length,
    data: {
      carts,
    },
  });
});

exports.getCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      cart,
    },
  });
});

exports.updateCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!cart) {
    next(new AppError("No cart found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      cart,
    },
  });
});

exports.deleteCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findByIdAndDelete(req.params.id);
  if (!cart) {
    next(new AppError("No cart found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
});
