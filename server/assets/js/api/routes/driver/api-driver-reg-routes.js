const express = require('express');
//const Reg = require("../controllers/api-reg-controller.js");
const controller = require("../../controllers/driver/api-driver-reg-controller.js")
const { body, check } = require("express-validator")
const router = express.Router();

const phoneRegExp = /^\d{10}$/;

// Add new user
router.post('/api/reg/driver/registration', [
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
        }),
        body('phone_number')
        .notEmpty().withMessage('Номер телефона не может быть пустым')
        // .matches(phoneRegExp).withMessage('Неправильный формат номера телефона'),
        // body('carDetails.make')
        // .notEmpty().withMessage('Производитель автомобиля не может быть пустым'),
        // body('carDetails.model')
        // .notEmpty().withMessage('Модель автомобиля не может быть пустой'),
        // body('carDetails.year')
        // .notEmpty().withMessage('Год выпуска автомобиля не может быть пустым')
        // .isNumeric().withMessage('Год выпуска должен быть числом'),
        // body('carDetails.licensePlate')
        // .notEmpty().withMessage('Государственный номер автомобиля не может быть пустым')
        // .isLength({ min: 6, max: 10 }).withMessage('Государственный номер должен содержать от 6 до 10 символов'),
        // body('carDetails.color')
        // .notEmpty().withMessage('Цвет автомобиля не может быть пустым'),
    ],
    controller.registration);
// Get user by email
router.post('/api/reg/driver/login', [
    check("email", "Email is invalid").notEmpty().isEmail(),
    check("password", "Password must be at least 8 characters").notEmpty().isLength({ min: 8, max: 16 }),
], controller.login);
// Get page
//router.get('/api/reg', controller.getReg);

module.exports = router;