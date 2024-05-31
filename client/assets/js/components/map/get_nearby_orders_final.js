import { printNearbyOrders } from "./print_nearby_orders_final.js";
import { fetchUpdateDriverCurrentLocation } from "../taxi/send-driver-position_final.js";
import { getCurrentPosition } from "./get_driver_current_position_final.js";
// import { printNearbyOrders, displayOrdersOnMap } from "./print_nearby_orders.js";


async function fetchGetNearbyOrders() {
    const token = localStorage.getItem('token');

    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
        };

        const apiUrl = "http://localhost:5000/api/order/get_nearby_orders";

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data.message);
            console.log(data.orders);

            printNearbyOrders(data.orders);
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}


export { fetchGetNearbyOrders };

document.addEventListener('DOMContentLoaded', fetchUpdateDriverCurrentLocation(getCurrentPosition()));
document.addEventListener('DOMContentLoaded', fetchGetNearbyOrders);
// document.getElementById('locate-btn').addEventListener('click', fetchGetNearbyOrders);
