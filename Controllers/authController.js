const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const catchAsync = require('../utils/catchAsync')
const User = require("./../models/userModel");
const AppError = require('../utils/appError');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}


exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    const token = signToken(newUser._id )
    res.status(201).json({
        status: "success",
        token,
      data: {
        user: newUser,
      },
    });
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // 1. Check if email and password exists
    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400))
    }

    // 2. Check is user exists and password is correct
    const user = await User.findOne({ email }).select('+password');


    if (!user || ! await user.correctPassword(password, user.password)) {
        return next(new AppError('Incorrect email or password', 401))
    }

    console.log(user);

    // 3. Check if password is correct
    const token = signToken(user._id)
    res.status(200).json({
        status: 'success',
        token,
    })
});

exports.protect = catchAsync  ( async(req, res, next) => {
    // 1. Gettiing token then check if it exists
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new AppError('Your not logged in! Please login to get access.', 401))
    }
    // 2. verifify the token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)    

    // 3. Check user still exists
    const freshUser = await User.findById(decoded.id)
    if (!freshUser) {
        return next(new AppError('The user belonging to this token does no longer exist.', 401))
    }

    // 4. Check if user changed password after the token was issued
    // const 
    // next()
})