const User = require("../../models/user.js");



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



