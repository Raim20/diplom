const fs = require('fs');
const path = require('path');
const Game = require("../models/items.js");
const Genre = require("../models/genre.js");
const Data_of_site = require("../models/data_of_site.js");
const User = require("../models/user.js");
const Order = require("../models/order.js");
const keys = require("../../static_functions/keys.js");
const createPath = require("../../static_functions/create-path.js");

module.exports.getData = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 5; // Количество результатов на странице
        const skip = (page - 1) * limit;

        const games = await Game.find().skip(skip).limit(limit);

        //const games = await Game.find();
        console.log(games);
        res.json({ games });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

module.exports.getEditData = async (req, res) => {
    try {
        console.log(req.params.id_of_game);
        const game = await Game.findOne({ id_of_game: `#${req.params.id_of_game}` })
        console.log(game)
        res.json({ game })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

module.exports.editData = async (req, res) => {
    try {
        console.log(req.params.id_of_game);
        console.log(req.body);
        const data = req.body.data;
        console.log(data);
        /*const game = await Game.findOne({ id_of_game: `#${req.params.id_of_game}` });
        if (!game) {
            return res.status(404).json({ message: "Игра не найдена" });
        }

        if (data.name) {
            game.name = data.name;
        }
        if (data.id_of_game) {
            game.id_of_game = data.id_of_game;
        }
        if (data.price) {
            game.price = data.price;
        }
        if (data.info) {
            game.info = data.info;
        }
        if (data.genres) {
            game.genres = data.genres;
        }
        if (data.stats) {
            // if (data.stats.platform) {
            //     game.stats.platform = data.stats.platform;
            // }
            // if (data.stats.release_date) {
            //     game.stats.release_date = data.stats.release_date;
            // }
            // if (data.stats.languages) {
            //     game.stats.languages = data.stats.languages;
            // }
            // if (data.stats.size) {
            //     game.stats.size = data.stats.size;
            // }
            // if (data.stats.publisher) {
            //     game.stats.publisher = data.stats.publisher;
            // }
            // if (data.stats.developer) {
            //     game.stats.developer = data.stats.developer;
            // }
            // if (data.stats.mode) {
            //     game.stats.mode = data.stats.mode;
            // }
            //game.stats = data.stats;

        }

        await game.save();*/

        const game = await Game.findOne({ id_of_game: `#${req.params.id_of_game}` });
        if (!game) {
            return res.status(404).json({ message: "Игра не найдена" });
        } else {
            const update_game = await Game.findOneAndUpdate(
                { id_of_game: `#${req.params.id_of_game}` },
                {
                    id_of_game: data.id_of_game,
                    img: data.id_of_game,
                    banner: data.id_of_game,
                    name: data.name,
                    price: data.price,
                    info: data.info,
                    genres: data.genres,
                    stats: {
                        platform: data.stats.platform,
                        release_date: data.stats.release_date,
                        languages: data.stats.languages,
                        size: data.stats.size,
                        publisher: data.stats.publisher,
                        developer: data.stats.developer,
                        mode: data.stats.mode,
                    },
                },
                { new: true }
            );

            console.log(update_game);
        }
        res.json({ message: "You have updated game data", game_edited_data: game });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};


/*
module.exports.createdata = async (req, res) => {
    try {
        const order = await Game({
            id_of_game: "req.body.id",
            img: "req.body.img",
            name: "req.body.name",
            price: "req.body.price",
        }).save()
        return res.json(order);
    } catch (error) {
        console.log(error);
    }
};*/


module.exports.createData = async (req, res) => {
    try {
        console.log(req.body);
        const data = req.body.data;
        console.log(data);
        for (const dataKey in data.stats) {
            console.log(data.stats[dataKey]);
        }
        const validate_game = await Game.findOne({ id_of_game: req.body.data.id_of_game });
        if (validate_game) {
            return res.json({ message: `Game with id ${req.body.data.id_of_game} is already available` });
        }

        const game = await Game({
            id_of_game: data.id_of_game,
            img: data.id_of_game,
            banner: data.id_of_game,
            name: data.name,
            price: data.price,
            info: data.info,
            genres: data.genres,
            stats: {
                platform: data.stats.platform,
                release_date: data.stats.release_date,
                languages: data.stats.languages,
                size: data.stats.size,
                publisher: data.stats.publisher,
                developer: data.stats.developer,
                mode: data.stats.mode,
            },
        }).save();

        console.log(game);
        res.json({ message: "You have created game data", game_created_data: game });
    } catch (error) {
        console.log(error);
    }
};

module.exports.checkGame = async (req, res) => {
    try {
        const itemId = `#${req.params.id_of_game}`;
        //const games = await Game.find()
        const user = await User.findOne({ _id: req.user.userId });
        let gamePurchased = false;

        for (const game of user.id_of_games) {
            const games = await Game.findOne({ _id: game.id_of_game });
            let findGame = games.id_of_game;
            console.log(findGame);

            if (findGame === itemId) {
                gamePurchased = true;
                res.status(200).json({ message: "", game_purchased: itemId });
                break;
            } else {
                res.status(200).json({ message: "", game_purchased: null });
            }

            //return res.status(200).json({ message: "", game_purchased: gamePurchased ? itemId : null });
            //let findGame = games.id_of_game;
            //console.log(findGame);
            // if (game.id_of_game === games) {
            //     findGame = games.id_of_game;
            // }

            // if (games.id_of_game === itemId) {
            //     return res.status(200).json({ message: "", game_purchased: req.params.id_of_game });
            // } else {
            //     return res.status(200).json({ message: "", game_purchased: null });
            // }
        }

        // for (const game of user.id_of_games) {
        //     if (itemId === game.id_of_game) {
        //         return res.status(200).json({ message: "", game_purchased: game.id_of_game });
        //     } else {
        //         return res.status(200).json({ message: "", game_purchased: null });
        //     }
        // }
        // console.log(games)
        // res.json({games})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

const { card } = require('../../../data/data_2.js');
const { genre_data } = require('../../../data/data_genre.js');
const { data_of_site_for_save } = require('../../../data/data_of_site.js');

module.exports.create_data_of_site = async (req, res) => {
    try {
        const save_data_of_site = data_of_site_for_save[0];

        console.log(save_data_of_site);
        const new_data_of_site = new Data_of_site(save_data_of_site);
        /*language: save_data_of_site.language,
            platform: {
            pc: {
                windows: save_data_of_site.platform.pc.windows,
                    macos: save_data_of_site.platform.pc.macos,
                    linux: save_data_of_site.platform.pc.linux,
            },
            console: {
                playstation: save_data_of_site.platform.console.playstation,
                    xbox: save_data_of_site.platform.console.xbox,
                    nintendo: save_data_of_site.platform.console.nintendo,
            },
            mobile: {
                android: save_data_of_site.platform.mobile.android,
                    ios: save_data_of_site.platform.mobile.ios,
            },
        },*/
        new_data_of_site.save()
            .then(() => {
                console.log('Данные успешно сохранены.');
            })
            .catch((err) => {
                console.error('Ошибка при сохранении данных: ' + err);
            });

    }catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

module.exports.create_data = async (req, res) => {
    try {
        // const games = card;
        const genre = genre_data;

        console.log(genre);
        for (let item in genre) {
            console.log(genre[item]);
            const newGenre = new Genre({
                id_of_genre: genre[item].id_of_genre,
                genre: genre[item].genre,
            });
            await newGenre.save();
        }

        // console.log(card.length);
        // for (let game in card) {
        //     console.log(card[game]);
        //     const newGame = new Game({
        //         id_of_game: card[game].id,
        //         img: card[game].img,
        //         name: card[game].name,
        //         price: card[game].price,
        //         info: card[game].info,
        //     });
        //     await newGame.save();
        // }


    } catch (error) {
        console.log(error);
    }
};

module.exports.getGenre = async (req, res) => {
    try {
        const genres = await Genre.find();
        console.log( genres );
        res.json({ genres: genres });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

module.exports.uploadImg = async (req, res) => {
    try {
        console.log(req.params.id_of_game);
        console.log(req.file);
        const fileUrl = `${req.protocol}://${req.get('host')}/${req.file.filename}`;
        console.log(fileUrl);
        const game = await Game.findOne({ id_of_game: `#${req.params.id_of_game}` });
        const avatarPath = path.join(keys.icon_dir_url, `${game.id_of_game.replace('#', '')}`, `${game.img}`);
        if (fs.existsSync(avatarPath)) {
            fs.unlinkSync(avatarPath);
            console.log(avatarPath);
        }
        console.log(game);
        game.img = req.file.filename;
        await game.save();
        console.log(game);
        // const game = Game.findOneAndUpdate(
        //     { id_of_game: `#${req.params.id_of_game}` },
        //     { $set: { img: fileUrl } },
        //     { new: true }
        // );
        // console.log(game);
        // res.json({ game });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

module.exports.deleteImg = async (req, res) => {
    try {
        //const fileUrl = `${req.protocol}://${req.get('host')}/${req.file.filename}`;
        const game = await Game.findOne({ id_of_game: `#${req.params.id_of_game}` });
        const avatarPath = path.join(keys.icon_dir_url, `${game.img}`);
        if (fs.existsSync(avatarPath)) {
            fs.unlinkSync(avatarPath);
            console.log(avatarPath)
        }

        game.img = fileUrl;
        await game.save();
        console.log(game);
        res.json({ game });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

/*
id_of_game: req.body.id,
            img: req.body.img,
            name: req.body.name,
            price: req.body.price,
            user: req.user.userId
 */
