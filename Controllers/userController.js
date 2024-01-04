const AppError = require("../utils/appError");
const User = require("./../models/userModel");
const catchAsync = require('../utils/catchAsync')


// exports.createUser = catchAsync(async (req, res, next) => {
//     const newUser = await User.create(req.body);
//     res.status(201).json({
//       status: "success",
//       data: {
//         user: newUser,
//       },
//     });
// });

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
}


exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1. Create error if user tries to update password
  if (req.body.password || req.body.confirmPassword) {
    return next(new AppError('This route is not for password upadtes pls use /updateMyPassword.', 400))
  }
  
  // 2. Filterd Out unwanted field names that are not allowed to be updated 
  const filteredBody = filterObj(req.body, 'name', 'email');

  // 3. Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, { new: true, runValidators: true });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  })
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
})

exports.deleteMe = catchAsync(async (req, res, next) => {
   await User.findByIdAndUpdate(req.user.id, { active: false});

  // if (!user) {
  //   return next(new AppError("No user found with that ID", 404));
  // }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
