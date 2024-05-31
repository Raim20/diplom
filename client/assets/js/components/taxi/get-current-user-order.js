// import { pickupLocation, destination } from "../../components/route-map_copy_2 copy.js";

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

        const apiUrl = "http://localhost:5000/api/order/get_current_user_order";

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data.message);
            console.log(data.fare);

            updateFareValues(data.fare);
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

function updateFareValues(fareData) {
    const fareElements = document.querySelectorAll('.popup_card_style');

    fareElements.forEach(element => {
        const id = element.getAttribute('data-id');
        const fareValueElement = element.querySelector('.popup_card_price_style');

        if (fareData[id] !== undefined) {
            fareValueElement.textContent = fareData[id];
        } else {
            console.warn(`Fare data for ${id} not found`);
        }
    });
}

// fetchGetFareCurrentUserOrder();