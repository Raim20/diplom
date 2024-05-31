export async function fetchCreateCurrenUserOrder(order) {
    const token = localStorage.getItem('token')

    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            body: JSON.stringify({ pickupLocation: order.pickupLocation, destination: order.destination, fare: Number(order.fare) })
        };

        const apiUrl = "http://localhost:5000/api/order/current_user_order";

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data.message);
            console.log(data.order);
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}



// export default card_temp