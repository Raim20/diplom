import { map } from "./init_map.js";
import { Marker } from "./get_marker_class_final.js";
import { getCurrentPosition } from "./validate_user_current_location_final.js";
import { fetchGetFareCurrentUserOrder } from "./get-fare-current-user-order_final.js";
import { fetchCreateCurrenUserOrder } from "../taxi/create-current-user-order_final.js";
import { fetchUploadCurrenUserOrder } from "../taxi/upload-current-user-order_final.js";
import { fetchUploadUserDriverData } from "../taxi/upload-user-driver-data_final.js";
import { showPopup, hidePopup } from "../../static_functions/display_popup.js";


import { Bot } from "./get_marker_class_bot_select_order.js";

let area = null;

// let botInterval = null;

// function startBotSimulation(startMarker, numBots = 10) {
//     if (botInterval) clearInterval(botInterval);

//     const area = {
//         latMin: startMarker.lat() - 0.005,
//         latMax: startMarker.lat() + 0.005,
//         lngMin: startMarker.lng() - 0.005,
//         lngMax: startMarker.lng() + 0.005
//     };

//     Bot.create_bots(numBots, area);

//     botInterval = setInterval(() => {
//         Bot.moveBots(area);
//     }, 2000);
// }

const startDeleteButton = document.getElementById("start-delete");
const endDeleteButton = document.getElementById("end-delete");
const getLocationButtons = document.querySelectorAll('.get_location');
const readyButton = document.getElementById('readyBtn');

if (!startDeleteButton || !endDeleteButton) {
    console.error("Delete buttons are missing from the DOM.");
}

function getRandomInt(n, k) {
    return Math.floor(Math.random() * (k - n + 1)) + n;
}

const n = 1;
const k = 6;


function user_driver_data_for_upload() {
    const drivers = [];
    const users = [];

    for (let i = 0; i < Bot.driver.length; i++) {
        const driver = {
            driverId: Bot.driver[i].driverId,
            driverName: Bot.driver[i].driverName,
            pickupLocation: Bot.driver[i].latlng.lat,
            categories: Bot.driver[i].categories,
        };
        drivers.push(driver);
    }

    for (let i = 0; i < Bot.user.length; i++) {
        const user = {
            userId: Bot.user[i].userId,
            userName: Bot.user[i].userName,
            pickupLocation: Bot.user[i].latlng.lat,
            destination: Bot.user[i].latlng.lng,
        };
        users.push(user);
    }

    const user_driver_data_for_upload = {
        drivers: drivers,
        users: users
    };

    console.log(user_driver_data_for_upload);

    return user_driver_data_for_upload;
}


function limitMarkers(newLatLng) {
    if (!Marker.get_start_marker()) {
        Marker.set_start_marker(newLatLng);
    } else if (!Marker.get_end_marker()){
        Marker.set_end_marker(newLatLng);
    } else {
        console.warn('Максимальное количество маркеров: 2');
    }

    if (Marker.get_start_marker() && Marker.get_end_marker()) {
        Marker.updateRoute();
        area = {
            latMin: Marker.get_start_marker().getPosition().lat() - 0.005,
            latMax: Marker.get_start_marker().getPosition().lat() + 0.005,
            lngMin: Marker.get_start_marker().getPosition().lng() - 0.005,
            lngMax: Marker.get_start_marker().getPosition().lng() + 0.005
        };
        Bot.create_bots(getRandomInt(n, k), area, getRandomInt(n, k));
        fetchUploadUserDriverData(user_driver_data_for_upload());
        readyButton.style.display = 'block';
        // startBotSimulation(Marker.get_start_marker().getPosition(), 10);
    } else {
        readyButton.style.display = 'none';
    }
}

if (map) {
    map.addListener('click', function (e) {
        limitMarkers(e.latLng);
    });
} else {
    console.error("Map is not initialized.");
}

if (startDeleteButton) {
    startDeleteButton.addEventListener("click", function() {
        if (Marker.get_start_marker()) {
            Marker.delete_marker_and_clear_route_path("startMarker");
            readyButton.style.display = 'none';
        }
    });
}

if (endDeleteButton) {
    endDeleteButton.addEventListener("click", function() {
        if (Marker.get_end_marker()) {
            Marker.delete_marker_and_clear_route_path("endMarker");
            readyButton.style.display = 'none';
        }
    });
}

if (getLocationButtons) {
    getLocationButtons.forEach(button => {
        button.addEventListener('click', function() {
            const check = button.id.includes('start') ? 'startMarker' : 'endMarker';
            getCurrentPosition(check);
        });
    });
} else {
    console.error("Location buttons are missing from the DOM.");
}


export function check_button(userPos, check) {
    if (check === "startMarker") {
        Marker.set_start_marker(userPos);
    } else if (check === "endMarker") {
        Marker.set_end_marker(userPos);
    } else {
        console.error("Invalid marker type specified.");
    }

    if (Marker.get_start_marker() && Marker.get_end_marker()) {
        Marker.updateRoute();
        area = {
            latMin: Marker.get_start_marker().getPosition().lat() - 0.005,
            latMax: Marker.get_start_marker().getPosition().lat() + 0.005,
            lngMin: Marker.get_start_marker().getPosition().lng() - 0.005,
            lngMax: Marker.get_start_marker().getPosition().lng() + 0.005
        };
        Bot.create_bots(getRandomInt(n, k), area, getRandomInt(n, k));
        fetchUploadUserDriverData(user_driver_data_for_upload());
        // startBotSimulation(Marker.get_start_marker().getPosition(), 10);
        readyButton.style.display = 'block';
    } else {
        readyButton.style.display = 'none';
    }
}

readyButton.addEventListener('click', async () => {
    // const pricingData = await fetchPricingData();
    // updatePopupWithPricing(pricingData);
    const pickupLocation = {
        coordinates: [Marker.get_start_marker().getPosition().lat(), Marker.get_start_marker().getPosition().lng()]
    };
    const destination = {
        coordinates: [Marker.get_end_marker().getPosition().lat(), Marker.get_end_marker().getPosition().lng()]
    };
    fetchGetFareCurrentUserOrder(pickupLocation, destination);
    showPopup();
    readyButton.style.display = 'none';
});

async function handlePopupItemClick(event) {
    const item = event.currentTarget;
    // const category = item.getAttribute('data-id');
    const priceElement = item.querySelector('.popup_card_price_style');
    const price = priceElement ? priceElement.textContent : null;

    if (price) {
        const pickupLocation = {
            coordinates: [Marker.get_start_marker().getPosition().lat(), Marker.get_start_marker().getPosition().lng()]
        };
        const destination = {
            coordinates: [Marker.get_end_marker().getPosition().lat(), Marker.get_end_marker().getPosition().lng()]
        };
        const driver = await Bot.assignOrderToRandomDriver();
        const rainCoefficient = await Marker.getWeatherData(Marker.get_start_marker().getPosition().lat(), Marker.get_start_marker().getPosition().lng());
        console.log(driver);
        const order_for_upload = {
            driver: driver,
            pickupLocation: pickupLocation,
            destination: destination,
            fare: Number(price),
            rainCoefficient: rainCoefficient,
        };
        const order = {
            driver: driver,
            pickupLocation: pickupLocation,
            destination: destination,
            fare: Number(price),
        };
        // const drivers = [];
        // const users = [];

        // for (let i = 0; i < Bot.driver.length; i++) {
        //     const driver = {
        //         driverId: Bot.driver[i].driverId,
        //         driverName: Bot.driver[i].driverName,
        //         pickupLocation: Bot.driver[i].latlng.lat,
        //         categories: Bot.driver[i].categories,
        //     };
        //     drivers.push(driver);
        // }

        // for (let i = 0; i < Bot.user.length; i++) {
        //     const user = {
        //         userId: Bot.user[i].userId,
        //         userName: Bot.user[i].userName,
        //         pickupLocation: Bot.user[i].latlng.lat,
        //         destination: Bot.user[i].latlng.lng,
        //     };
        //     users.push(user);
        // }

        // const user_driver_data_for_upload = {
        //     drivers: drivers,
        //     users: users
        // };

        // console.log(user_driver_data_for_upload);

        // const user_driver_data_for_upload = {
        //     driver: [{
        //         driverId: driverId,
        //         pickupLocation: pickupLocation,
        //         categories: categories,
        //     }],
        //     user: [{
        //         userId: userId,
        //         pickupLocation: pickupLocation,
        //         destination: destination,
        //     }],
        // };
        fetchCreateCurrenUserOrder(order);
        fetchUploadCurrenUserOrder(order_for_upload);
        // fetchUploadUserDriverData(user_driver_data_for_upload);
        Bot.stopAndClearAllBots();
        // return order;
    }
}

const popupItems = document.querySelectorAll('.popup_card_style');
popupItems.forEach(item => {
    item.addEventListener('click', handlePopupItemClick);
});

// readyButton.addEventListener('click', fetchPrices);

// export function check_button(userPos, check) {
//     if (check === "startMarker") {
//         if (Marker.start_marker) {
//             Marker.set_start_marker_position(userPos);
//         } else {
//             Marker.set_start_marker(userPos);
//         }
//     } else if (check === "endMarker") {
//         if (Marker.end_marker) {
//             Marker.set_end_marker_position(userPos);
//         } else {
//             Marker.set_end_marker(userPos);
//         }
//     } else {
//         console.error("Invalid marker type specified.");
//     }

//     if (Marker.get_start_marker() && Marker.get_end_marker()) {
//         Marker.updateRoute();
//     }
// }







// import { map } from "./init_map.js";
// import { Marker } from "./get_marker_class.js";
// import { getCurrentPosition } from "./validate_user_current_location_final.js";
// // import { startMarker, endMarker, limitMarkers } from "./create_marker.js";
// // import { deleteMarker } from "./delete_marker.js";
// // import { getCurrentPosition } from "./get_current_position.js";
// // import { startTrackingLocation } from "./get_position.js";

// const startDeleteButton = document.getElementById("start-delete");
// const endDeleteButton = document.getElementById("end-delete");
// // const get_current_position = document.getElementById('get_current_position');
// // const get_start_tracking_location = document.getElementById('get_start_tracking_location');

// function limitMarkers(newLatLng) {
//     if (!Marker.get_start_marker()) {
//         Marker.set_start_marker(newLatLng);
//     } else if (!Marker.get_end_marker()){
//         Marker.set_end_marker(newLatLng);
//     } else {
//         console.warn('Максимальное количество маркеров: 2');
//     }

//     if (Marker.get_start_marker() && Marker.get_end_marker()) {
//         Marker.updateRoute();
//     }
// }

// map.addListener('click', function(e) {
//     limitMarkers(e.latLng);
//     // getAddressFromLatLng(e.latLng);
// });

// startDeleteButton.addEventListener("click", function() {
//     if (Marker.get_start_marker()) {
//         Marker.delete_marker_and_clear_route_path("startMarker");
//         // deleteMarker("startMarker");
//     }
// });

// endDeleteButton.addEventListener("click", function() {
//     if (Marker.get_end_marker()) {
//         Marker.delete_marker_and_clear_route_path("endMarker");
//         // deleteMarker("endMarker");
//     }
// });

// const getLocationButtons = document.querySelectorAll('.get_location');

// getLocationButtons.forEach(button => {
//     button.addEventListener('click', function() {
//         const check = button.id.includes('start') ? 'startMarker' : 'endMarker';
//         getCurrentPosition(check);
//     });
// });

// export function check_button(userPos, check) {
//     if (check === "startMarker") {
//         if (Marker.start_marker) {
//             // Marker.delete_marker(check);
//             Marker.set_start_marker_position(userPos);
//         }
//         Marker.set_start_marker(userPos);
//     } else if (check === "endMarker") {
//         if (Marker.end_marker) {
//             // Marker.delete_marker(check);
//             Marker.set_end_marker_position(userPos);
//         }
//         Marker.set_end_marker(userPos);
//     }
// }