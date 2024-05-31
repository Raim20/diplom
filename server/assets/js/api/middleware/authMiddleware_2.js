const jwt = require("jsonwebtoken");
const keys = require("../../static_functions/keys.js");
const User = require("../models/user.js");
const Driver = require("../models/driver.js");

module.exports = async (req, res, next) => {
    if (req.method === "OPTIONS") {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(403).json({message: "Пользователь не авторизован"});
        }

        const decodedData = jwt.verify(token, keys.jwt);
        req.user = decodedData;

        const user = await User.findById(req.user.userId);
        const driver = await Driver.findById(req.user.driverId);
        console.log(user);
        console.log(driver);

        if (user) {
            req.user.userType = 'user';
        } else if (driver) {
            req.user.userType = 'driver';
        } else {
            return res.status(403).json({ message: "Неверный тип пользователя" });
        }

        // if (user && !driver) {
        //     req.user.userType = 'user';
        // } else if (!user && driver) {
        //     req.user.userType = 'driver';
        // } else {
        //     return res.status(403).json({ message: "Неверный тип пользователя" });
        // }

        next();

        // const user = await User.findById(req.user.id);
        // if (user) {
        //     req.userType = 'user';
        //     return next();
        // }

        // const driver = await Driver.findById(req.user.id);
        // if (driver) {
        //     req.userType = 'driver';
        //     return next();
        // }

        // next()
    } catch (error) {
        console.log(error);
        return res.status(403).json({message: "Пользователь не авторизован"});
    }
};