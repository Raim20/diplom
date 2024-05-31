import { printNearbyOrders, displayOrdersOnMap } from "./print_nearby_orders.js";

// const data_temp = [
//     {
//         id: "1",
//         user_name: "man",
//         pickupLocation: [43.235, 76.9],
//         destination: [43.335, 76.8],
//         fare: 540,
//     },
// ];

// displayOrdersOnMap(data_temp);

export async function fetchGetNearbyOrders() {
    const token = localStorage.getItem('token');

    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            // body: JSON.stringify({ pickupLocation: pickupLocation, destination: destination })
        };

        const apiUrl = "http://localhost:5000/api/order/get_nearby_orders";

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data.message);
            console.log(data.orders);

            // const data_temp = {
            //     id: "1",
            //     user_name: "man",
            //     pickupLocation: [43.235, 76.9],
            //     destination: [43.335, 76.8],
            //     fare: 540,
            // }

            printNearbyOrders(data.orders);
            displayOrdersOnMap(data.orders);
            // displayOrdersOnMap(data_temp);
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}


document.addEventListener('DOMContentLoaded', fetchGetNearbyOrders);
document.getElementById('locate-btn').addEventListener('click', fetchGetNearbyOrders);
