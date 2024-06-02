export async function fetchUploadUserDriverData(data_temp) {
    const token = localStorage.getItem('token')

    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            body: JSON.stringify({ data: data_temp })
        };

        const apiUrl = "http://localhost:5000/api/order/upload_user_driver_data";

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data.message);
            console.log(data.data);
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}



// export default card_temp