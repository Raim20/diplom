const createPath = require("../static_functions/create-path.js");

module.exports.getProfile = (req, res) => {
    try {
        const title = 'Profile';
        res.render(createPath('profile'), { title });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};


