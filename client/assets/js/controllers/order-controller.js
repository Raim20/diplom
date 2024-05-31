const createPath = require("../static_functions/create-path.js");
//const { fetchStoreData } = require("../components/store-get.js")

module.exports.getOrder = (req, res) => {
    try {
        const title = 'Order';
        res.render(createPath('order'), { title });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

module.exports.getGame = (req, res) => {
    try {
        const id_of_game = req.params.id_of_game;
        console.log(id_of_game);
        const title = 'Store';
        res.render(createPath('game_test'), { id: id_of_game, title });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};


