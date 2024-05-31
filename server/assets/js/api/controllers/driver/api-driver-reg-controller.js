const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Driver = require("../../models/driver.js");
const keys = require("../../../static_functions/keys.js");
const errorHandler = require("../../../static_functions/handleError.js");
const createPath = require("../../../static_functions/create-path.js");
const { validationResult } = require("express-validator")
class ApiDriverRegController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Ошибка при регистрации", errors });
            }

            // const { name, email, password, re_enter_password, phone_number, carDetails } = req.body;
            const { name, email, password, re_enter_password, phone_number } = req.body;

            if (password !== re_enter_password) {
                return res.status(400).json({ message: 'Пароли не совпадают' });
            }

            const existingDriver = await Driver.findOne({ email: email });
            if (existingDriver) {
                return res.status(403).json({ message: 'Пользователь уже существует' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const carDetails = {
                make: "null",
                model: "null",
                year: 1999,
                licensePlate: "null",
                color: "null",
            };

            const add_driver = await Driver.create({
                name: name,
                email: email,
                password: hashedPassword,
                phone_number: phone_number,
                carDetails: carDetails,
            });

            // const add_driver = await new Driver({
            //     name: name,
            //     email: email,
            //     password: hashedPassword,
            //     phone_number: phone_number,
            //     carDetails: carDetails,
            // });

            // await add_driver.save();
            res.status(201).json({ message: 'Регистрация прошла успешно', driver: add_driver });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Внутренняя ошибка сервера" });
        }
    }
    async login(req, res) {
            try {
                console.log(req.body)
                const { email, password } = req.body

                const driver = await Driver.findOne({ email: email });
                if (!driver) {
                    return res.status(401).json({ message: 'Пользователь с таким email не найден' });
                }

                const isMatch = await bcrypt.compare(password, driver.password);
                if (!isMatch) {
                    return res.status(401).json({ message: 'Неверный пароль' });
                }

                const token_driver = jwt.sign({
                    email: driver.email,
                    driverId: driver._id,
                }, keys.jwt, { expiresIn: "1h" });

                const token = `Bearer ${token_driver}`

                //res.cookie('token', token, { httpOnly: true });
                //res.cookie('token', token, { maxAge: 60 * 60, httpOnly: true })
                //res.json(token)
                //res.redirect("/store")
                res.status(200).json({ message: 'Авторизация прошла успешно', token_driver: token });
                //const title = 'auth';
                //res.redirect('../basket')
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: "Внутренняя ошибка сервера" });
            }
        }
        /*async getReg(req, res) {
            try {
                const title = 'auth';
                res.render(createPath('reg'), { title });
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: "Внутренняя ошибка сервера" });
            }
        }*/
}

module.exports = new ApiDriverRegController()