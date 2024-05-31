const fs = require('fs');
const path = require('path');
const Game = require("../models/items.js");
const Genre = require("../models/genre.js");
const Data_of_site = require("../models/data_of_site.js");
const User = require("../models/user.js");
const Order = require("../models/order.js");
const keys = require("../../static_functions/keys.js");
const createPath = require("../../static_functions/create-path.js");

module.exports.getLanguage = async (req, res) => {
    try {
        const get_language = await Data_of_site.find();
        if (get_language) {
            console.log(get_language[0].language);

            res.status(200).json({ message: "", get_language: get_language[0].language });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

module.exports.getPlatform = async (req, res) => {
    try {
        const get_platform = await Data_of_site.find();
        if (get_platform) {
            console.log(get_platform[0].platform);

            res.status(200).json({ message: "", get_platform: get_platform[0].platform });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

module.exports.getGenre = async (req, res) => {
    try {
        const genres = await Genre.find();
        if (genres) {
            console.log(genres);

            res.status(200).json({ genres: genres });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};







