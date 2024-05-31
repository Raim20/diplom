const fs = require("fs");
const path = require("path");
const createPath = require("../../static_functions/create-path.js");
// const Game = require("../models/items.js");
const User = require("../models/user.js")
// const keys = require("../../static_functions/keys.js");


module.exports.getProfile = async (req, res) => {
    try {
        const { userId } = req.user
        const user_data = await User.findOne({ _id: userId })
        console.log(user_data)
        res.json({user_data})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

module.exports.getUserGames = async (req, res) => {
    try {
        const { userId } = req.user
        const user_data = await User.findOne({ _id: userId })
        const games = []
        for (let game in user_data.id_of_games) {
            const gameData = await Game.findOne({ _id: user_data.id_of_games[game].purchased_id_of_game });
            const gameWithAddedAt = {
                game: gameData,
                addedAt: user_data.id_of_games[game].addedAt // Предположим, что у вас есть поле addedAt для каждой игры
            };
            games.push(gameWithAddedAt);
        }

        console.log(games)
        res.json({ games: games })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

module.exports.updateProfile = async (req, res) => {
    try {
        const { userId } = req.user;
        console.log(req.file);
        const fileUrl = `${req.protocol}://${req.get('host')}/${req.file.filename}`;
        console.log(fileUrl);
        const user_update = await User.findOne({ _id: userId });
        const avatarPath = path.join(keys.user_avatar_url, `${userId}`, `${user_update.avatar}`);
        if (fs.existsSync(avatarPath)) {
            fs.unlinkSync(avatarPath);
            console.log(avatarPath);
        }
        console.log(user_update);
        user_update.avatar = req.file.filename;
        await user_update.save();
        // const user = await User.findOne({ _id: userId });
        // if (user.avatar !== "/svg/profile.svg") {
        //     if (fs.existsSync(__dirname + 'assets/data/avatar' + req.file.filename)) {
        //         fs.unlinkSync(__dirname + 'assets/data/avatar' + req.file.filename);
        //     }
        // }

        // const avatarPath = req.file ? req.file.filename : "/svg/profile.svg";
        // console.log(avatarPath);
        // const fileUrl = `${req.protocol}://${req.get('host')}/${req.file.filename}`;
        // console.log(fileUrl);
        // const user_update = await User.findOneAndUpdate(
        //     { _id: req.user.userId },
        //     { $set: { avatar: req.file.filename } },
        //     { new: true }
        // );
        console.log(user_update);
        res.status(200).json({ user: { _id: user_update._id, avatar: user_update.avatar } });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};


// module.exports.uploadAvatar = async (req, res) => {
//     try {
//         console.log(req.file);
//         const avatarPath = req.file ? req.file.path : "/svg/profile.svg";
//         const fileUrl = `${req.protocol}://${req.get('host')}/${req.file.filename}`;
//         res.json({ fileUrl: fileUrl });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Внутренняя ошибка сервера" });
//     }
// };
//
// module.exports.updateProfile = async (req, res) => {
//     try {
//         // console.log(req.file);
//         // const avatarPath = req.file ? req.file.path : "/svg/profile.svg";
//         // console.log(req.protocol);
//         // console.log(req.get('host'));
//         // const fileUrl = `${req.protocol}://${req.get('host')}/${req.file.path}`;
//         // console.log(fileUrl);
//         const fileUrl = req.fileUrl;
//         console.log(fileUrl);
//         const user = await User.findOneAndUpdate(
//             { _id: req.user.userId },
//             { $set: { avatar: fileUrl } },
//             { new: true }
//         );
//         console.log(user);
//         res.status(200).json({ user: user });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Внутренняя ошибка сервера" });
//     }
// };


