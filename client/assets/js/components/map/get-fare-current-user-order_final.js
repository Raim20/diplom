import { updateFareValues } from "./update_fare_values_final.js";


let fare = null;

export async function fetchGetFareCurrentUserOrder(pickupLocation, destination) {
    const token = localStorage.getItem('token');

    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            body: JSON.stringify({ pickupLocation: pickupLocation, destination: destination })
        };

        const apiUrl = "http://localhost:5000/api/order/get_fare_current_user_order";

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data.message);
            console.log(data.fare);

            updateFareValues(data.fare);

            fare = data.fare;
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

export { fare };