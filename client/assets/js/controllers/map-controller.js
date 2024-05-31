const createPath = require("../static_functions/create-path.js");

module.exports.getMap = (req, res) => {
    try {
        const title = 'Map';
        res.render(createPath('map'), { title });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

module.exports.getUserMap = (req, res) => {
    try {
        const title = 'Map';
        res.render(createPath('map'), { title });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

module.exports.getDriverMap = (req, res) => {
    try {
        const title = 'Map';
        res.render(createPath('map'), { title });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

module.exports.getOrderMap = (req, res) => {
    try {
        const title = 'Map';
        res.render(createPath('map'), { title });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};


