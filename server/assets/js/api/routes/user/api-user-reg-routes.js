const express = require('express');
const controller = require("../../controllers/user/api-user-reg-controller.js")
const { body, check } = require("express-validator")
const router = express.Router();

const phoneRegExp = /^\d{10}$/;

router.post('/api/reg/user/registration', [
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
    ],
    controller.registration);
router.post('/api/reg/user/login', [
    check("email", "Email is invalid").notEmpty().isEmail(),
    check("password", "Password must be at least 8 characters").notEmpty().isLength({ min: 8, max: 16 }),
], controller.login);

module.exports = router;





















// const express = require('express');
// const userController = require('./controllers/user_controller.js');

// const router = express.Router();

// const { body, validationResult } = require('express-validator');

// router.post('/users', [
//   body('name').notEmpty().withMessage('Name is required'),
//   body('email').isEmail().withMessage('Invalid email'),
//   body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
// ], (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
// });
// router.post('/api/users', userController.createUser);
// router.get('/api/users', userController.getAllUsers);
// router.put('/api/users/:userId', userController.updateUser);
// router.delete('/api/users/:userId', userController.deleteUser);

// module.exports = router;

