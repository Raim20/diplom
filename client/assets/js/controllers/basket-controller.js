const createPath = require("../static_functions/create-path.js");

module.exports.getAllBasket = (req, res) => {
    try {
        const title = 'Basket';
        res.render(createPath('basket'), { title });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};


