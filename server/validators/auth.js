const {check} = require('express-validator');

exports.userRegisterValidator = [
  check('name')
    .not()
    .isEmpty()
    .withMessage('Name is required'),
  check('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
  check('password')
    .isLength({min: 6})
    .withMessage('Password must be at least 6 characters long'),
  check('categories')
    .isLength({min: 6})
    .withMessage('Please pick at least one category you are interested in')
];


exports.userLoginValidator = [
  check('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
  check('password')
    .isLength({min: 6})
    .withMessage('Password must be at least 6 characters long')
];

exports.forgotPasswordValidator = [
  check('email')
    .isEmail()
    .withMessage('Must be a valid email address')
];

exports.resetPasswordValidator = [
  check('resetPasswordLink')
    .not()
    .isEmpty()
    .withMessage('Token is required'),
  check('newPassword')
    .isLength({min: 6})
    .withMessage('Password must be at least 6 characters long')
];

exports.userUpdateValidator = [
  check('name')
    .not()
    .isEmpty()
    .withMessage('Name is required')
];
