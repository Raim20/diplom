
function validate_pickup_location(pickupLocation) {
    if (!pickupLocation || !pickupLocation.coordinates || pickupLocation.coordinates.length !== 2 || 
        isNaN(pickupLocation.coordinates[0]) || isNaN(pickupLocation.coordinates[1])) {
            return false;
        // return res.status(400).json({ message: "Некорректные координаты точки отправления" });
    } else {
        return true;
    }
}

function validate_destination_location(destination) {
    if (!destination || !destination.coordinates || destination.coordinates.length !== 2 || 
        isNaN(destination.coordinates[0]) || isNaN(destination.coordinates[1])) {
            return false;
        // return res.status(400).json({ message: "Некорректные координаты точки назначения" });
    } else {
        return true;
    }
}

function validate_fare(fare) {
    if (!fare || typeof fare !== 'number' || fare < 0) {
        return false;
        // return res.status(400).json({ message: "Некорректная стоимость" });
    } else {
        return false;
    }
}


// export { validate_pickup_location, validate_destination_location, validate_fare };

module.exports = { validate_pickup_location, validate_destination_location, validate_fare };

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