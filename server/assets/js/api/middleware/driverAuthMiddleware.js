const Driver = require("../models/driver.js");

module.exports = async (req, res, next) => {
    try {
        const driver = await Driver.findById(req.driverId);
        if (!driver) {
            return res.status(401).json({ message: 'Нет доступа' });
        }
        req.userType = 'driver';
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
};
