const express = require('express');
//const Reg = require("../controllers/api-reg-controller.js");
const controller = require("../controllers/user/api-user-reg-controller.js")
const { body, check } = require("express-validator")
const router = express.Router();

// Add new user
router.post('/api/reg/registration', [
        body('name')
        .notEmpty().withMessage('The name cannot be empty')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
        body('email')
        .notEmpty().withMessage('The email cannot be empty')
        .isEmail().withMessage('Invalid email format'),
        body('password')
        .notEmpty().withMessage('The password cannot be empty')
        .isLength({ min: 8, max: 16 }).withMessage('Password must be at least 8 characters'),
        body('re_enter_password')
        .notEmpty().withMessage('The repeat password cannot be empty')
        .isLength({ min: 8, max: 16 }).withMessage('Repeat password must be at least 8 characters')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords must match');
            }
            return true;
        })
    ],
    controller.registration);
// Get user by email
router.post('/api/reg/login', [
    check("email", "Email is invalid").notEmpty().isEmail(),
    check("password", "Password must be at least 8 characters").notEmpty().isLength({ min: 8, max: 16 }),
], controller.login);
// Get page
//router.get('/api/reg', controller.getReg);

module.exports = router;