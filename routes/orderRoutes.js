const express = require("express");
const orderController = require("../Controllers/orderController");
const authController = require("../Controllers/authController")

const router = express.Router();

router
  .route("/")
  .get(orderController.getAllOrders)
  .post(orderController.createOrder);

router
  .route("/:id")
  .delete(authController.protect, authController.restrictTo('admin', 'support'),orderController.deleteOrder)
  .patch(orderController.updateOrder)
  .get(orderController.getOrder);

module.exports = router;
