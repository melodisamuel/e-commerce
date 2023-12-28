const express = require("express");
const userController = require("../Controllers/userController");
const authController = require('../Controllers/authController')

const router = express.Router();

router.route('/signup').post(authController.signup)
router.route('/login').post(authController.login)

router.route('/forgotPassword').post(authController.forgotPassword)
router.route('/resetPassword/:token').patch(authController.resetPassword)

router.route('/updateMyPassword').patch(authController.protect,authController.updatePassword)

router
  .route("/")
  .get(userController.getAllUsers)
  // .post(userController.createUser);

router
  .route("/:id")
  .delete(userController.deleteUser)
  .patch(userController.updateUser)
  .get(userController.getUser);

module.exports = router;
