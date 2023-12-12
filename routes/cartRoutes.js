const express = require("express");
const cartController = require("../Controllers/cartController");

const router = express.Router();

router
  .route("/")
  .get(cartController.getCartHistory)
  .post(cartController.createCart);

router
  .route("/:id")
  .delete(cartController.deleteCart)
  .patch(cartController.updateCart)
  .get(cartController.getCart);

module.exports = router;
