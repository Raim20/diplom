// const Game = require("../models/items.js");
const User = require("../models/user.js");
const Driver = require("../models/driver.js");
// const Order = require("../models/order.js");
const MAPBOX_API_KEY = 'pk.eyJ1IjoicmFpbW1lZ2EiLCJhIjoiY2x2NDlndGJoMDZtZzJpcjJkaWNrdDVsOSJ9.Y9he5g5b_LeHk8qXQgtnnA';

const { Client } = require("@googlemaps/google-maps-services-js");
const client = new Client({});

function decodePolyline(encoded) {
    let points = [];
    let index = 0, len = encoded.length;
    let lat = 0, lng = 0;

    while (index < len) {
        let b, shift = 0, result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
        let dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
        lat += dlat;

        shift = 0;
        result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
        let dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
        lng += dlng;

        points.push({lat: (lat / 1E5), lng: (lng / 1E5)});
    }
    return points;
}


module.exports.getMap = async (req, res) => {
    try {
        const { start, end } = req.body;

        if (!start || !end || !start.lat || !start.lng || !end.lat || !end.lng) {
            return res.status(400).json({ message: "Некорректные входные данные" });
        }

        console.log(req.body);

        const response = await client.directions({
            params: {
                origin: `${start.lat},${start.lng}`,
                destination: `${end.lat},${end.lng}`,
                mode: "driving",
                key: 'AIzaSyCJh5-3X07tQgE7m-EutKMJ86PXzAY0F0k'
            }
        });

        if (response.data.routes && response.data.routes.length > 0) {
            const route = response.data.routes[0];
            const decodedRoute = decodePolyline(route.overview_polyline.points);
            // const decodedRoute = polyline.decode(route.overview_polyline.points);
            // for (var i = 0; i < decodedRoute.length; i++) {
            //     var temp = decodedRoute[i][0];
            //     decodedRoute[i][0] = decodedRoute[i][1];
            //     decodedRoute[i][1] = temp;
            // }
            console.log("test");
            console.log(decodedRoute);
            res.json({ map_data: decodedRoute });
        } else {
            res.status(404).json({ message: "Маршрут не найден" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

module.exports.getUserLocation = async (req, res) => {
    try {
        const { userId } = req.user;

        const user_data = await User.findOne({ _id: userId });

        if (!user_data) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        console.log(user_data);

        const user_current_location = user_data.current_location;
        if (!user_current_location || isNaN(user_current_location.coordinates[0]) || isNaN(user_current_location.coordinates[1])) {
            res.status(406).json({ message: "Некорректные координаты" });
        }

        console.log(user_current_location);

        res.status(200).json({ message: "Местоположение пользователя", user_current_location: user_current_location });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

module.exports.createUserLocation = async (req, res) => {
    try {
        const { start, end } = req.body;

        if (!start || !end || !start.lat || !start.lng || !end.lat || !end.lng) {
            return res.status(400).json({ message: "Некорректные входные данные" });
        }

        console.log(req.body);

        const response = await client.directions({
            params: {
                origin: `${start.lat},${start.lng}`,
                destination: `${end.lat},${end.lng}`,
                mode: "driving",
                key: 'AIzaSyCJh5-3X07tQgE7m-EutKMJ86PXzAY0F0k'
            }
        });

        if (response.data.routes && response.data.routes.length > 0) {
            const route = response.data.routes[0];
            const decodedRoute = decodePolyline(route.overview_polyline.points);
            // const decodedRoute = polyline.decode(route.overview_polyline.points);
            // for (var i = 0; i < decodedRoute.length; i++) {
            //     var temp = decodedRoute[i][0];
            //     decodedRoute[i][0] = decodedRoute[i][1];
            //     decodedRoute[i][1] = temp;
            // }
            console.log("test");
            console.log(decodedRoute);
            res.json({ map_data: decodedRoute });
        } else {
            res.status(404).json({ message: "Маршрут не найден" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

module.exports.editUserLocation = async (req, res) => {
    try {
        const { userId } = req.user;
        const { user_current_location } = req.body;

        const user_data = await User.findOne({ _id: userId });
        
        if (!user_data) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        if (!user_current_location || isNaN(user_current_location.lat) || isNaN(user_current_location.lng)) {
            return res.status(400).json({ message: "Некорректные входные данные" });
        }

        if (user_current_location.lat < -90 || user_current_location.lat > 90 || user_current_location.lng < -180 || user_current_location.lng > 180) {
            return res.status(400).json({ message: "Некорректные координаты" });
        }

        // if (!user_current_location || !user_current_location.lat || !user_current_location.lng || typeof user_current_location.lat !== Number || typeof user_current_location.lng !== Number) {
        //     return res.status(400).json({ message: "Некорректные входные данные" });
        // }

        console.log(user_current_location);

        // const user_data = await User.findOne({ _id: req.user.userId });
        const updated_user_data = await User.findOneAndUpdate(
            { _id: userId },
            { $set: { current_location: { type: "Point", coordinates: [user_current_location.lng, user_current_location.lat] } } },
            { new: true },
        );

        return res.status(200).json({ message: "Местоположение пользователя успешно обновлено", user: updated_user_data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

module.exports.getDriverLocation = async (req, res) => {
    try {
        const { driverId } = req.driver;

        const driver_data = await Driver.findOne({ _id: driverId });

        if (!driver_data) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        console.log(driver_data);

        const driver_current_location = driver_data.current_location;
        if (!driver_current_location || isNaN(driver_current_location.coordinates[0]) || isNaN(driver_current_location.coordinates[1])) {
            res.status(406).json({ message: "Некорректные координаты" });
        }

        console.log(driver_current_location);

        res.status(200).json({ message: "Местоположение пользователя", driver_current_location: driver_current_location });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

module.exports.createDriverLocation = async (req, res) => {
    try {
        const { start, end } = req.body;

        if (!start || !end || !start.lat || !start.lng || !end.lat || !end.lng) {
            return res.status(400).json({ message: "Некорректные входные данные" });
        }

        console.log(req.body);

        const response = await client.directions({
            params: {
                origin: `${start.lat},${start.lng}`,
                destination: `${end.lat},${end.lng}`,
                mode: "driving",
                key: 'AIzaSyCJh5-3X07tQgE7m-EutKMJ86PXzAY0F0k'
            }
        });

        if (response.data.routes && response.data.routes.length > 0) {
            const route = response.data.routes[0];
            const decodedRoute = decodePolyline(route.overview_polyline.points);
            // const decodedRoute = polyline.decode(route.overview_polyline.points);
            // for (var i = 0; i < decodedRoute.length; i++) {
            //     var temp = decodedRoute[i][0];
            //     decodedRoute[i][0] = decodedRoute[i][1];
            //     decodedRoute[i][1] = temp;
            // }
            console.log("test");
            console.log(decodedRoute);
            res.json({ map_data: decodedRoute });
        } else {
            res.status(404).json({ message: "Маршрут не найден" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

module.exports.editDriverLocation = async (req, res) => {
    try {
        const { driverId } = req.driver;
        const { driver_current_location } = req.body;

        const driver_data = await Driver.findOne({ _id: driverId });
        
        if (!driver_data) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        if (!driver_current_location || isNaN(driver_current_location.lat) || isNaN(driver_current_location.lng)) {
            return res.status(400).json({ message: "Некорректные входные данные" });
        }

        if (driver_current_location.lat < -90 || driver_current_location.lat > 90 || driver_current_location.lng < -180 || driver_current_location.lng > 180) {
            return res.status(400).json({ message: "Некорректные координаты" });
        }

        // if (!user_current_location || !user_current_location.lat || !user_current_location.lng || typeof user_current_location.lat !== Number || typeof user_current_location.lng !== Number) {
        //     return res.status(400).json({ message: "Некорректные входные данные" });
        // }

        console.log(driver_current_location);

        // const user_data = await User.findOne({ _id: req.user.userId });
        const updated_driver_data = await Driver.findOneAndUpdate(
            { _id: driverId },
            { $set: { current_location: { type: "Point", coordinates: [driver_current_location.lng, driver_current_location.lat] } } },
            { new: true },
        );

        return res.status(200).json({ message: "Местоположение пользователя успешно обновлено", driver: updated_driver_data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};


















// const googleMapsClient = require('@google/maps').createClient({
//     key: 'AIzaSyCJh5-3X07tQgE7m-EutKMJ86PXzAY0F0k'
// });

// module.exports.getMap = async (req, res) => {
//     try {
//         const { start, end } = req.body;

//         if (!start || !end || !start.lat || !start.lng || !end.lat || !end.lng) {
//             return res.status(400).json({ message: "Некорректные входные данные" });
//         }

//         console.log(req.body);

//         const response = await googleMapsClient.directions({
//             origin: `${start.lat},${start.lng}`,
//             destination: `${end.lat},${end.lng}`,
//             mode: 'driving'
//         }).asPromise();

//         // const decodedRoute = polyline.decode(response.json.routes[0].overview_polyline.points);

//         // if (response.json.routes && response.json.routes.length > 0) {
//         //     console.log(decodedRoute);

//         //     res.json({ map_data: decodedRoute });
//         // } else {
//         //     res.status(404).json({ message: "Маршрут не найден" });
//         // }


//         if (response.json.routes && response.json.routes.length > 0) {
//             const route = response.json.routes[0];
//             const decodedRoute = polyline.decode(route.overview_polyline.points);
//             console.log(decodedRoute);
//             res.json({ map_data: decodedRoute });
//         } else {
//             res.status(404).json({ message: "Маршрут не найден" });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Внутренняя ошибка сервера" });
//     }
// };






module.exports.getAllBasket = async(req, res) => {
    try {
        console.log(req.user.userId);
        const order = await Order.findOne({ user: req.user.userId });
        console.log(order)
        if (!order || order.items.length === 0) {
            return res.status(404).json({ message: "Order empty" })
        }

        const games = []
        for (let game in order.items) {
            games[game] = await Game.findOne({ _id: order.items[game].item_id })
        }

        console.log(games)

        return res.json({ order_items: games })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

module.exports.getById = async(req, res) => {
    try {
        const get_order_by_id = await Order.findOne({ _id: req.params.id_of_game })
        return res.json({ get_order_by_id })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

module.exports.remove = async(req, res) => {
    try {
        console.log(req.params.id_of_game)
        const item_id = `#${req.params.id_of_game}`
        const order = await Order.findOne({ user: req.user.userId })
        console.log(order)
        if (!order) {
            return res.status(404).json({ message: "Order empty" })
        } else {
            const updateOrder = await Order.findOneAndUpdate({ user: req.user.userId }, { $pull: { items: { "item.purchased_id_of_game": item_id } } }, { new: true });
            if (!updateOrder) {
                return res.status(404).json({ message: "Item not found on order" })
            }
        }
        return res.json({ message: `Items with id: ${item_id} deleted`, id_of_game: item_id })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

module.exports.validateOrder = async(req, res) => {
    try {
        console.log(req.user.userId);
        const order = await Order.findOne({ user: req.user.userId });
        console.log(order);

        if (!order || order.items.length === 0) {
            return res.status(404).json({ message: "Order empty" })
        }

        const itemIds = order.items.map(item => item.item_id);
        const user = await User.findOne({ _id: req.user.userId });

        if (!user.id_of_games || user.id_of_games.length === 0) {
            for (const game of itemIds) {
                console.log("When library is empty: " + game);
                user.id_of_games.push({ purchased_id_of_game: game });
            }

            user.save();

            await Order.findOneAndDelete({ user: req.user.userId });

            return res.status(200).json({ message: "Order confirmed" });
        } else {
            const gamesToAdd = [];

            for (const game_user of user.id_of_games) {
                for (const game_order of order.items) {
                    if (game_user.purchased_id_of_game !== game_order.item_id) {
                        console.log(game_order.item_id);
                        gamesToAdd.push({ purchased_id_of_game: game_order.item_id });
                    }
                }
            }

            for (const game of gamesToAdd) {
                console.log("When library had:" + game.purchased_id_of_game);
                user.id_of_games.push({ purchased_id_of_game: game.purchased_id_of_game });
            }

            user.save();

            await Order.findOneAndDelete({ user: req.user.userId });

            return res.status(200).json({ message: "Order confirmed" });

            // gamesToAdd = order.items.filter(game_order =>
            //     !user.id_of_games.some(game_user => game_user.purchased_id_of_game === game_order.item_id)
            // ).map(game_order => ({ purchased_id_of_game: game_order.item_id }));


            // for (const game_user of user.id_of_games) {
            //     for (const game_order of order.items) {
            //         if (game_user.id_of_game !== game_order.item_id) {
            //             console.log(game_order.item_id);
            //             gamesToAdd.push({ id_of_game: game_order.item_id });
            //         }
            //     }
            // }

            // for (const game_order of order.items) {
            //     if (!user.id_of_games.some(game_user => game_user.purchased_id_of_game !== game_order.item_id)) {
            //         console.log(game_order.item_id);
            //         gamesToAdd.push({ purchased_id_of_game: game_order.item_id });
            //     }
            // }

            // for (const game of gamesToAdd) {
            //     console.log("When library had:" + game.purchased_id_of_game);
            //     //user.id_of_games.push({ id_of_game: game.id_of_game });
            // }

            //user.save();

            //await Order.findOneAndDelete({ user: req.user.userId });

            //return res.status(200).json({ message: "Order confirmed" });
        }
        // await User.findOneAndUpdate(
        //     { _id: req.user.userId },
        //     { $push: { id_of_games: { $each: itemIds } } },
        //     //{ $set: { id_of_games: order.items.length } },
        //     { new: true }
        // )
        // await Order.findOneAndDelete({ user: req.user.userId })
        //
        // return res.status(200).json({ message: "Order confirmed" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};



/*
const user = await User.findOne({ _id: req.user.userId });
        const existingGameIds = user.id_of_games.map(game => game.id_of_game);;
        const gamesToAdd = [];
        const newGames = [];
        // if (!user.id_of_games || user.id_of_games.length === 0) {
        //     for (let game of order.items) {
        //         user.id_of_games.push({ id_of_game: game.item_id });
        //         console.log(game.item_id);
        //     }
        //
        //     await user.save();
        //     return res.status(200).json({ message: "Order confirmed" });
        // }
        // else {
        //     for (let game in user.id_of_games) {
        //         existingGameIds[game] = user.id_of_games[game].id_of_game;
        //         console.log(user.id_of_games[game].id_of_game);
        //     }
        //
        //     // for (let game in order.items) {
        //     //     if (!existingGameIds.includes(order.items[game].item_id)) {
        //     //         gamesToAdd[game] = order.items[game].item_id;
        //     //         console.log(gamesToAdd[game]);
        //     //     }
        //     // }
        //
        //     for (let game in order.items) {
        //         if (existingGameIds.includes(order.items[game].item_id)) {
        //             gamesToAdd.push(order.items[game].item_id);
        //             console.log(order.items[game].item_id);
        //         }
        //     }
        // }

        // for (let game of user.id_of_games) {
        //     existingGameIds[game] = game.id_of_game;
        //     console.log(game.id_of_game);
        // }

        // for (let game of order.items) {
        //     if (!existingGameIds.includes(game.item_id)) {
        //         gamesToAdd.push(game.item_id);
        //         console.log(game.item_id);
        //     }
        // }

        if (existingGameIds.length === 0) {
            for (const game of order.items) {
                gamesToAdd.push(game.item_id);
            }
        } else {
            for (const game of order.items) {
                if (!existingGameIds.includes(game.item_id)) {
                    gamesToAdd.push(game.item_id);
                }
            }
        }

        if (gamesToAdd.length > 0) {
            user.id_of_games = user.id_of_games.concat(
                gamesToAdd.map(id_of_game => ({ id_of_game }))
            );
        }

        // for (let game in gamesToAdd) {
        //     newGames[game] = { id_of_game: gamesToAdd[game] };
        //     console.log(game);
        // }
        //
        // for (let game in newGames) {
        //     user.id_of_games.push({ id_of_game: newGames[game].id_of_game });
        //     console.log(newGames[game].id_of_game);
        // }

        console.log(";" + existingGameIds);
        console.log(":" + gamesToAdd);
        // console.log("." + newGames);

        // const games = [];
        // for (let game in order.items) {
        //     games[game] = await Game.findOne({ _id: order.items[game].item_id });
        // }
        //
        // console.log(games);

        await user.save();

        //const itemIds = order.items.map(item => item.item_id);
//const user = await User.findOne({ _id: req.user.userId });
        //const existingGameIds = user.id_of_games.map(game => game.id_of_game);
        //const gamesToAdd = [];
        // console.log(";" + existingGameIds);
        // if (existingGameIds.length === 0) {
        //     gamesToAdd.push(order.items.item_id)
        // } else {
        //     for (const gameId in order.items) {
        //         if (!existingGameIds.includes(gameId.item_id)) {
        //             gamesToAdd.push(gameId.item_id)
        //         }
        //     }
        // }

        // for (const gameId in order.items) {
        //     if (!existingGameIds.includes(gameId.item_id)) {
        //         gamesToAdd.push(gameId.item_id)
        //     }
        // }

        // if (!Array.isArray(gamesToAdd)) {
        //     gamesToAdd = [];
        // }

        //const gamesToAdd = order.items.filter(gameId => !existingGameIds.includes(gameId));
        // console.log(":" + gamesToAdd);
        // if (gamesToAdd.length === 0) {
        //     return res.status(200).json({ message: "Все игры уже добавлены" });
        // }
        // const newGames = gamesToAdd.map(gameId => ({ id_of_game: gameId }));
        // console.log(newGames);


        // console.log(itemIds)
        //
        // const userDoc = await User.findOne({ _id: req.user.userId });
        // for (const itemId of itemIds) {
        //     const idOfGame = itemId;
        //
        //     console.log(idOfGame)
        //     const found = userDoc.id_of_games.some((item) => item.id_of_game === idOfGame);
        //
        //     if (!found) {
        //         userDoc.id_of_games.push({
        //             id_of_game: idOfGame,
        //             addedAt: new Date(),
        //         });
        //     }
        // }
        //
        // await userDoc.save();
*/


/*else {
            const updateOrder = await Order.findOne({
                items: { $elemMatch: { item_id: item_id } },
                user: req.headers.userId,
            })
            if (updateOrder) {
                await Order.findOneAndDelete(
                    { user: req.headers.userId },
                    { $pull: { items: { item_id: item_id } } },
                    { new: true })
            } else {
                return res.status(404).json({ message: "Item not found on order" })
            }
        }*/