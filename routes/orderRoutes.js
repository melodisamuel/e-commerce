const express = require("express");
const orderController = require("../Controllers/orderController");

const router = express.Router();

router
  .route("/")
  .get(orderController.getAllOrders)
  .post(orderController.createOrder);

router
  .route("/:id")
  .delete(orderController.deleteOrder)
  .patch(orderController.updateOrder)
  .get(orderController.getOrder);

module.exports = router;
