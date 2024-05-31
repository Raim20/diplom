async function fetchGetOrders() {
    const token = localStorage.getItem('token');

    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: token
            },
        };

        const apiUrl = "http://localhost:5000/api/order/confirmed_order";

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            const orders = data.user_confirmed_orders;
            const orderContainer = document.querySelector('.page_order_items');
            orderContainer.innerHTML = '';

            for (const order of orders) {
                const pickupAddress = await getAddressFromLatLng(order.pickupLocation);
                const destinationAddress = await getAddressFromLatLng(order.destination);

                const orderElement = `
                <div data-id="${order.id}" class="order_item_style">
                    <div class="order_item_info">
                      <div class="order_item_pickup">Pickup: ${pickupAddress}</div>
                      <div class="order_item_destination">Destination: ${destinationAddress}</div>
                      <div class="order_item_fare">Fare: $${order.fare}</div>
                      <div class="order_item_driver">Driver: ${order.driverName}</div>
                      <div class="order_item_date">Date: ${new Date(order.date).toLocaleString()}</div>
                    </div>
                </div>`;
                orderContainer.innerHTML += orderElement;
            }

            document.querySelectorAll('.order_item_style').forEach(item => {
                item.addEventListener('click', () => {
                    const orderId = item.getAttribute('data-id');
                    window.location.href = `/order/${orderId}`;
                });
            });

        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

async function getAddressFromLatLng(latlng) {
    const geocoder = new google.maps.Geocoder();
    const latlngObj = new google.maps.LatLng(latlng.lat, latlng.lng);

    return new Promise((resolve, reject) => {
        geocoder.geocode({ 'location': latlngObj }, (results, status) => {
            if (status === 'OK' && results[0]) {
                resolve(results[0].formatted_address);
            } else {
                reject('Geocode was not successful for the following reason: ' + status);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', fetchGetOrders);
