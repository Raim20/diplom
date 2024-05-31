const createPath = require("../static_functions/create-path.js");

module.exports.getData = (req, res) => {
    try {
        const title = 'Admin';
        res.render(createPath('admin'), { title });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

module.exports.editData = (req, res) => {
    try {
        const id_of_game = req.params.id_of_game;
        console.log(id_of_game);
        const title = 'Edit';
        res.render(createPath('admin_edit'), { id: id_of_game, title });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

module.exports.createData = (req, res) => {
    try {
        //const id_of_game = req.params.id_of_game;
        //console.log(id_of_game);
        const title = 'Create';
        res.render(createPath('admin_create'), { title });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};
