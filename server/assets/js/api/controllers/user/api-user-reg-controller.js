const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user.js");
const keys = require("../../../static_functions/keys.js");
const errorHandler = require("../../../static_functions/handleError.js");
const createPath = require("../../../static_functions/create-path.js");
const { validationResult } = require("express-validator")
class ApiUserRegController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Ошибка при регистрации", errors });
            }

            const { name, email, password, re_enter_password, phone_number } = req.body;

            if (password !== re_enter_password) {
                return res.status(400).json({ message: 'Пароли не совпадают' });
            }

            const existingUser = await User.findOne({ email: email });
            if (existingUser) {
                return res.status(403).json({ message: 'Пользователь уже существует' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const add_user = await User.create({
                name: name,
                email: email,
                password: hashedPassword,
                phone_number: phone_number,
            });

            // const add_user = await new User({
            //     name: name,
            //     email: email,
            //     password: hashedPassword,
            //     phone_number: phone_number,
            // });

            // await add_user.save();
            res.status(201).json({ message: 'Регистрация прошла успешно', user: add_user });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Внутренняя ошибка сервера" });
        }
    }
    async login(req, res) {
            try {
                console.log(req.body)
                const { email, password } = req.body

                const user = await User.findOne({ email: email });
                if (!user) {
                    return res.status(401).json({ message: 'Пользователь с таким email не найден' });
                }

                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return res.status(401).json({ message: 'Неверный пароль' });
                }

                const token_user = jwt.sign({
                    email: user.email,
                    userId: user._id,
                }, keys.jwt, { expiresIn: "1h" });

                const token = `Bearer ${token_user}`

                //res.cookie('token', token, { httpOnly: true });
                //res.cookie('token', token, { maxAge: 60 * 60, httpOnly: true })
                //res.json(token)
                //res.redirect("/store")
                res.status(200).json({ message: 'Авторизация прошла успешно', token: token });
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

module.exports = new ApiUserRegController()