const Driver = require("../../models/driver.js");
const CurrentUserOrder = require("../../models/current_user_order.js");




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

module.exports.getDriversLocations = async (req, res) => {
    try {
        const { userId } = req.user;

        const user_data = await User.findOne({ _id: userId });

        if (!user_data) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        console.log(user_data);

        const current_user_order = await CurrentUserOrder.findOne({ customer: user_data._id });

        if (!current_user_order) {
            return res.status(404).json({ message: "Текущий заказ не найден" });
        }

        // const driver_data = await Driver.findOne({ _id: driverId });

        // if (!driver_data) {
        //     return res.status(404).json({ message: "Пользователь не найден" });
        // }

        // console.log(driver_data);

        const drivers = await Driver.find({
            "current_location.coordinates": {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [current_user_order.pickupLocation.coordinates[0], current_user_order.pickupLocation.coordinates[1]],
                    },
                    $maxDistance: 500,
                },
            }
        });

        if (drivers.length === 0) {
            return res.status(404).json({ message: "Водители не найдены в указанной области" });
        }

        const drivers_locations = drivers.map(driver => ({
            id: driver._id,
            name: driver.name,
            coordinates: driver.current_location.coordinates,
        }));

        console.log(drivers_locations);

        // const driver_current_location = driver_data.current_location;
        // if (!driver_current_location || isNaN(driver_current_location.coordinates[0]) || isNaN(driver_current_location.coordinates[1])) {
        //     res.status(406).json({ message: "Некорректные координаты" });
        // }

        // console.log(driver_current_location);

        res.status(200).json({ message: "Местоположение водителей", drivers_current_locations: drivers_locations });
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


module.exports.getDriverCurrentLocation = async (req, res) => {
    try {
        const { driverId, userType } = req.driver;

        if (userType !== "driver") {
            return res.status(403).json({ message: "Доступ запрещен" });
        }

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

module.exports.updateDriverCurrentLocation = async (req, res) => {
    try {
        const { driverId, userType } = req.driver;
        const { position } = req.body;

        if (userType !== "driver") {
            return res.status(403).json({ message: "Доступ запрещен" });
        }

        const driver_data = await Driver.findOne({ _id: driverId });

        if (!driver_data) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        console.log(driver_data);

        if (!position || isNaN(position.coordinates[0]) || isNaN(position.coordinates[1])) {
            res.status(406).json({ message: "Некорректные координаты" });
        }

        driver_data.current_location = { 
            type: "Point", 
            coordinates: position,
        };
        
        await driver_data.save();

        res.status(200).json({ message: "Местоположение водителя успешно обновлено" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};