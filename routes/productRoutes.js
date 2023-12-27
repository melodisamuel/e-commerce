const express = require("express");
const productController = require("./../Controllers/productController");
const authController = require('./../Controllers/authController')

const router = express.Router();

router.route('/cheap-products').get
  (productController.aliasCheapProducts, productController.getAllProducts)

router.route("/search").get(productController.searchProducts);

router
  .route("/")
  .get(authController.protect, productController.getAllProducts)
  .post(productController.createProduct);

router
  .route("/:id")
  .delete(productController.deleteProduct)
  .patch(productController.updateProduct)
  .get(productController.getProduct);

module.exports = router;
