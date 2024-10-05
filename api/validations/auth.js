const { body } = require('express-validator');

exports.registerValidation = [
    body('username', 'Username is too short').isLength({ min: 3 }),
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
];

exports.loginValidation = [
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
];