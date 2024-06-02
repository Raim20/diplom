const createPath = require("../static_functions/create-path.js");

module.exports.getReg = (req, res) => {
    try {
        const title = 'Authorization';
        res.render(createPath('reg_user'), { title });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

module.exports.getRegDriver = (req, res) => {
    try {
        const title = 'Authorization';
        res.render(createPath('reg_driver'), { title });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};


