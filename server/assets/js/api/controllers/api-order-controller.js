const User = require("../models/user.js");
const Driver = require("../models/driver.js");
const ConfirmedOrder = require("../models/order/confirmed_order.js");
const CurrentOrder = require("../models/order/current_order_final.js");
const CurrentUserOrder = require("../models/order/current_user_order.js");
const { validate_pickup_location, validate_destination_location, validate_fare } = require("../middleware/validate_data_of_order.js");
const moment = require("moment");
const saveDataToJsonFile = require("../middleware/saveToJson.js");
// import { validate_pickup_location, validate_destination_location, validate_fare } from "../middleware/validate_data_of_order.js";



module.exports.getConfirmedOrder = async (req, res) => {
    try {
        const { userId, userType } = req.user;
        const page = parseInt(req.query.page) || 1;
        const limit = 5; // Количество результатов на странице
        const skip = (page - 1) * limit;
        const {  } = req.body;
        
        if (userType !== "user") {
            return res.status(403).json({ message: "Доступ запрещен" });
        }

        const user_data = await User.findOne({ _id: userId });

        if (!user_data) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        console.log(user_data);

        const confirmed_orders = await ConfirmedOrder.find().skip(skip).limit(limit);

        res.status(200).json({ message: "Местоположение пользователя", user_confirmed_orders: confirmed_orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

module.exports.getLastConfirmedOrder = async (req, res) => {
    try {
        const { userId, userType } = req.user;

        if (userType !== "user") {
            return res.status(403).json({ message: "Доступ запрещен" });
        }

        const user_data = await User.findOne({ _id: userId });

        if (!user_data) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        console.log(user_data);

        const last_confirmed_order = await ConfirmedOrder.findOne({ customer: userId }).sort({ createdAt: -1 });

        if (!last_confirmed_order) {
            return res.status(404).json({ message: "Последний подтвержденный заказ не найден" });
        }

        console.log(last_confirmed_order);

        res.status(200).json({ message: "Последний подтвержденный заказ пользователя", user_last_confirmed_order: last_confirmed_order });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

module.exports.createConfirmedOrder = async (req, res) => {
    try {
        const { userId, userType } = req.user;
        const {  } = req.body;

        if (userType !== "user") {
            return res.status(403).json({ message: "Доступ запрещен" });
        }

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

module.exports.getCurrentOrder = async (req, res) => {
    try {
        const { userId, userType } = req.user;

        if (userType !== "user") {
            return res.status(403).json({ message: "Доступ запрещен" });
        }

        const user_data = await User.findOne({ _id: userId });

        if (!user_data) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        console.log(user_data);

        const current_order = await CurrentOrder.findOne({ customer: userId });

        if (!current_order) {
            return res.status(404).json({ message: "Текущий  заказ не найден" });
        }

        console.log(current_order);

        res.status(200).json({ message: "Текущий заказ пользователя", user_current_order: current_order });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

module.exports.createCurrentOrder = async (req, res) => {
    try {
        const { userId, userType } = req.user;
        const { order } = req.body;
        // const {  } = req.body;

        console.log(order);

        if (userType !== "user") {
            return res.status(403).json({ message: "Доступ запрещен" });
        }

        const user_data = await User.findOne({ _id: userId });

        if (!user_data) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        console.log(user_data);

        const user_order = await CurrentUserOrder.findOne({ customer: userId });

        if (validate_pickup_location(order.pickupLocation) === false && validate_destination_location(order.destination) === false && validate_fare(order.fare) === false) {
            return res.status(400).json({ message: "Некорректные данные" });
        }

        // if (!pickupLocation || !pickupLocation.coordinates || pickupLocation.coordinates.length !== 2 || 
        //     isNaN(pickupLocation.coordinates[0]) || isNaN(pickupLocation.coordinates[1])) {
        //     return res.status(400).json({ message: "Некорректные координаты точки отправления" });
        // }

        // if (!destination || !destination.coordinates || destination.coordinates.length !== 2 || 
        //     isNaN(destination.coordinates[0]) || isNaN(destination.coordinates[1])) {
        //     return res.status(400).json({ message: "Некорректные координаты точки назначения" });
        // }

        // if (!fare || typeof fare !== 'number' || fare < 0) {
        //     return res.status(400).json({ message: "Некорректная стоимость" });
        // }

        const new_current_order = new CurrentOrder({
            customer: userId,
            driver: order.driver.id,
            pickupLocation: { type: "Point", coordinates: order.pickupLocation.coordinates },
            destination: { type: "Point", coordinates: order.destination.coordinates },
            status: "accepted",
            fare: order.fare,
        });

        await new_current_order.save();

        res.status(201).json({ message: "Заказ успешно создан", current_order: new_current_order });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

// module.exports.createCurrentOrder = async (req, res) => {
//     try {
//         const { userId } = req.user;
//         const { driverId } = req.driver;
//         const { order_status } = req.body;

//         const user_data = await User.findOne({ _id: userId });

//         if (!user_data) {
//             return res.status(404).json({ message: "Пользователь не найден" });
//         }

//         console.log(user_data);

//         const user_order = await CurrentOrder.findOne({ customer: userId, driver: driverId });

//         if (!user_order) {
//             return res.status(404).json({ message: "Текущий заказ не найден" });
//         } else {
//             if (order.customerApproval && order.driverApproval) {
//                 user_order.status = order_status;
//                 user_order.customerApproval = false;
//                 user_order.driverApproval = false;
//             } else {
//                 return res.status(403).json({ message: "Нет прав для подтверждения этого заказа" });
//             }

//             await user_order.save();

//             // const update_order = await CurrentOrder.findOneAndUpdate(
//             //     { customer: userId, driver: driverId },
//             //     {
//             //         status: order_status,
//             //     },
//             // );
//         }

//         res.status(201).json({ message: "Заказ успешно обновлен", current_order: user_order });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Внутренняя ошибка сервера" });
//     }
// };

module.exports.createConfirmCurrentOrder = async (req, res) => {
    try {
        const { userId } = req.user;
        const { driverId } = req.driver;
        // const { order_status } = req.body;

        const user_data = await User.findOne({ _id: userId });

        if (!user_data) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        console.log(user_data);

        const user_order = await CurrentOrder.findOne({ customer: userId, driver: driverId });

        if (!user_order) {
            return res.status(404).json({ message: "Текущий заказ не найден" });
        }

        if (order.customer.toString() === userId) {
            order.customerApproval = true;
        } else if (order.driver.toString() === driverId) {
            order.driverApproval = true;
        } else {
            return res.status(403).json({ message: "Нет прав для подтверждения этого заказа" });
        }

        res.status(201).json({ message: "Заказ успешно обновлен", current_order: user_order });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};



module.exports.getCurrentUserOrder = async (req, res) => {
    try {
        const { userId } = req.user;

        const user_data = await User.findOne({ _id: userId });

        if (!user_data) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        console.log(user_data);

        const current_order_for_acceptance = await CurrentUserOrder.findOne({ customer: userId });

        if (!current_order_for_acceptance) {
            return res.status(404).json({ message: "Текущий заказ не найден" });
        }

        res.status(200).json({ message: "Текущий заказ пользователя", user_current_order_for_acceptance: current_order_for_acceptance });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

module.exports.createCurrentUserOrder = async (req, res) => {
    try {
        const { userId } = req.user;
        const { pickupLocation, destination, fare } = req.body;
        // const { userType } = req.userType;
        const { userType } = req.user;

        if (userType !== "user") {
            return res.status(403).json({ message: "Доступ запрещен" });
        }

        console.log(userType);

        console.log(pickupLocation, destination, fare);

        const user_data = await User.findOne({ _id: userId });

        if (!user_data) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        console.log(user_data);

        if (validate_pickup_location(pickupLocation) && validate_destination_location(destination) && validate_fare(fare)) {
            return res.status(400).json({ message: "Некорректные данные" });
        }

        // if (!pickupLocation || !pickupLocation.coordinates || pickupLocation.coordinates.length !== 2 || 
        //     isNaN(pickupLocation.coordinates[0]) || isNaN(pickupLocation.coordinates[1])) {
        //     return res.status(400).json({ message: "Некорректные координаты точки отправления" });
        // }

        // if (!destination || !destination.coordinates || destination.coordinates.length !== 2 || 
        //     isNaN(destination.coordinates[0]) || isNaN(destination.coordinates[1])) {
        //     return res.status(400).json({ message: "Некорректные координаты точки назначения" });
        // }

        // if (!fare || typeof fare !== 'number' || fare < 0) {
        //     return res.status(400).json({ message: "Некорректная стоимость" });
        // }

        const newOrder = new CurrentUserOrder({
            customer: userId,
            pickupLocation: { type: "Point", coordinates: pickupLocation.coordinates },
            destination: { type: "Point", coordinates: destination.coordinates },
            fare: fare,
        });

        await newOrder.save();

        console.log(newOrder);

        res.status(201).json({ message: "Заказ успешно создан", order: newOrder });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};



module.exports.createFareCurrentUserOrder = async (req, res) => {
    try {
        const { userId } = req.user;
        const { pickupLocation, destination } = req.body;

        const user_data = await User.findOne({ _id: userId });

        if (!user_data) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        console.log(user_data);

        if (validate_pickup_location(pickupLocation) === false && validate_destination_location(destination) === false) {
            return res.status(400).json({ message: "Некорректные данные" });
        }

        // if (!pickupLocation || !pickupLocation.coordinates || pickupLocation.coordinates.length !== 2 || 
        //     isNaN(pickupLocation.coordinates[0]) || isNaN(pickupLocation.coordinates[1])) {
        //     return res.status(400).json({ message: "Некорректные координаты точки отправления" });
        // }

        // if (!destination || !destination.coordinates || destination.coordinates.length !== 2 || 
        //     isNaN(destination.coordinates[0]) || isNaN(destination.coordinates[1])) {
        //     return res.status(400).json({ message: "Некорректные координаты точки назначения" });
        // }

        // const distance = await calculateDistance(pickupLocation, destination);

        // if (!distance) {
        //     return res.status(500).json({ message: "Не удалось вычислить расстояние" });
        // }

        const distance = 5;

        // const distance = calculateDistance(pickupLocation, destination);

        const fareEconom = calculateFare(distance, 'econom');
        const fareComfort = calculateFare(distance, 'comfort');
        const farePremium = calculateFare(distance, 'premium');

        res.status(201).json({ message: "Заказ успешно создан", fare: { econom: fareEconom, comfort: fareComfort, premium: farePremium } });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};


module.exports.getNearbyOrders = async (req, res) => {
    try {
        const { driverId } = req.user;
        const { userType } = req.user;
        // const { userType } = req.userType;

        if (userType !== "driver") {
            return res.status(403).json({ message: "Доступ запрещен" });
        }

        const driver_data = await Driver.findOne({ _id: driverId });

        if (!driver_data) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        console.log(driver_data);

        const orders = await CurrentUserOrder.find({
            pickupLocation: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [driver_data.current_location.coordinates[0], driver_data.current_location.coordinates[1]],
                    },
                    $maxDistance: 1500,
                },
            }
        });

        if (orders.length === 0) {
            return res.status(404).json({ message: "Заказы не найдены в указанной области" });
        }

        // const orders_data = orders.map(order => ({
        //     id: order._id,
        //     userId: order.userId,
        //     pickupLocation: order.pickupLocation.coordinates,
        //     destination: order.destination.coordinates,
        //     fare: order.fare,
        // }));

        const orders_data = await Promise.all(orders.map(async order => {
            const user = await User.findById(order.customer);
            return {
                id: order._id,
                user_name: user.name,
                pickupLocation: order.pickupLocation.coordinates,
                destination: order.destination.coordinates,
                fare: order.fare,
            };
        }));

        console.log(orders_data);

        // const current_order_for_acceptance = await CurrentUserOrder.findOne({ customer: userId });

        // if (!current_order_for_acceptance) {
        //     return res.status(404).json({ message: "Текущий заказ не найден" });
        // }

        res.status(200).json({ message: "Заказы в указанной области", orders: orders_data });
        // res.status(200).json({ message: "Текущий заказ пользователя", user_current_order_for_acceptance: current_order_for_acceptance });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};




const calculateDistance = async (pickupLocation, destination) => {
    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
            params: {
                origins: `${pickupLocation.coordinates[1]},${pickupLocation.coordinates[0]}`,
                destinations: `${destination.coordinates[1]},${destination.coordinates[0]}`,
                key: process.env.GOOGLE_MAPS_API_KEY
            }
        });

        const distance = response.data.rows[0].elements[0].distance.value;
        return distance;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const calculateFare = (distance, category) => {
    let baseFare = 0;
    let farePerKm = 0;

    switch (category) {
        case 'econom':
            baseFare = 50;
            farePerKm = 10;
            break;
        case 'comfort':
            baseFare = 70;
            farePerKm = 15;
            break;
        case 'premium':
            baseFare = 100;
            farePerKm = 20;
            break;
        default:
            // Если указана неверная категория, возвращаем null
            return null;
    }

    const distanceInKm = distance / 1000;
    const fare = baseFare + (farePerKm * distanceInKm);

    return fare;
};



module.exports.uploadCurrentUserOrder = async (req, res) => {
    try {
        const { userId } = req.user;
        const { order } = req.body;

        console.log(order);

        const user_data = await User.findOne({ _id: userId });

        if (!user_data) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        console.log(user_data);

        // if (validate_pickup_location(pickupLocation) && validate_destination_location(destination) && validate_fare(fare)) {
        //     return res.status(400).json({ message: "Некорректные данные" });
        // }

        const date = moment().format("DDMMYYYY-HHmmss_SSS");

        const data = {
            userId: userId,
            order: order,
            uploadDate: date,
        };

        const jsonDirectory = `assets/data/order/${userId}`;
        const jsonFileName = `upload-order-info-${date}.json`;

        saveDataToJsonFile(data, jsonDirectory, jsonFileName);

        // res.status(200).send("File uploaded and data saved.");

        res.status(201).json({ message: "File uploaded and data saved", data: data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

module.exports.uploadUserDriverData = async (req, res) => {
    try {
        const { userId } = req.user;
        const { data } = req.body;

        console.log(data);

        const user_data = await User.findOne({ _id: userId });

        if (!user_data) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        console.log(user_data);

        // if (validate_pickup_location(pickupLocation) && validate_destination_location(destination) && validate_fare(fare)) {
        //     return res.status(400).json({ message: "Некорректные данные" });
        // }

        const date = moment().format("DDMMYYYY-HHmmss_SSS");

        const data_for_save = {
            userId: userId,
            data: data,
            uploadDate: date,
        };

        const jsonDirectory = `assets/data/user_driver_data`;
        const jsonFileName = `upload-user-driver-data-${date}.json`;

        saveDataToJsonFile(data_for_save, jsonDirectory, jsonFileName);

        // res.status(200).send("File uploaded and data saved.");

        res.status(201).json({ message: "File uploaded and data saved", data: data_for_save });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};


// module.exports.createFareCurrentUserOrder = async (req, res) => {
//     try {
//         const { userId } = req.user;
//         const { pickupLocation, destination } = req.body;

//         const user_data = await User.findOne({ _id: userId });

//         if (!user_data) {
//             return res.status(404).json({ message: "Пользователь не найден" });
//         }

//         console.log(user_data);

//         if (!pickupLocation || !pickupLocation.coordinates || pickupLocation.coordinates.length !== 2 || 
//             isNaN(pickupLocation.coordinates[0]) || isNaN(pickupLocation.coordinates[1])) {
//             return res.status(400).json({ message: "Некорректные координаты точки отправления" });
//         }

//         if (!destination || !destination.coordinates || destination.coordinates.length !== 2 || 
//             isNaN(destination.coordinates[0]) || isNaN(destination.coordinates[1])) {
//             return res.status(400).json({ message: "Некорректные координаты точки назначения" });
//         }

//         // const distance = await calculateDistance(pickupLocation, destination);

//         // if (!distance) {
//         //     return res.status(500).json({ message: "Не удалось вычислить расстояние" });
//         // }

//         const distance = 5;
//         const fare = calculateFare(distance);

//         res.status(201).json({ message: "Заказ успешно создан", fare: fare });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Внутренняя ошибка сервера" });
//     }
// };



// const calculateDistance = async (pickupLocation, destination) => {
//     try {
//         const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
//             params: {
//                 origins: `${pickupLocation.coordinates[1]},${pickupLocation.coordinates[0]}`,
//                 destinations: `${destination.coordinates[1]},${destination.coordinates[0]}`,
//                 key: process.env.GOOGLE_MAPS_API_KEY
//             }
//         });

//         const distance = response.data.rows[0].elements[0].distance.value;
//         return distance;
//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// };

// const calculateFare = (distance) => {
//     const baseFare = 50;
//     const farePerKm = 10;

//     const distanceInKm = distance / 1000;
//     const fare = baseFare + (farePerKm * distanceInKm);

//     return fare;
// };








