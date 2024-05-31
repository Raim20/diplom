export async function fetchAddOrder(pickupLocation, destination) {
    const token = localStorage.getItem('token')

    try {
        const alex = 'hello';
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            body: JSON.stringify({ pickupLocation: pickupLocation, destination: destination })
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

// fetchAddOrder();

// async function fetchValidateOrder() {
//     const token = localStorage.getItem('token')

//     try {
//         const requestOptions = {
//             method: 'PATCH',
//             headers: {
//                 Authorization: token
//             },
//         };

//         const apiUrl = "http://localhost:5000/api/basket/";

//         const response = await fetch(apiUrl, requestOptions);
//         const data = await response.json();

//         if (response.ok) {
//             console.log(data);
//         } else {
//             console.error(data.message);
//         }
//     } catch (error) {
//         console.error('Ошибка:', error);
//     }
// }

// document.addEventListener('click', async (e) => {
//     if (e.target.closest('.basket_button_header_order')) {
//         console.log(e);
//         fetchValidateOrder()
//     }
// });