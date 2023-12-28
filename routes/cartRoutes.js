const express = require("express");
const cartController = require("../Controllers/cartController");
const authController = require('../Controllers/authController')

const router = express.Router();

router
  .route("/")
  .get(cartController.getCartHistory)
  .post(cartController.createCart);

router
  .route("/:id")
  .delete(authController.protect, authController.restrictTo('admin', 'support'),cartController.deleteCart)
  .patch(cartController.updateCart)
  .get(cartController.getCart);

module.exports = router;
