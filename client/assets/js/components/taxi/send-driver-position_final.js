async function fetchUpdateDriverCurrentLocation(position) {
    const token = localStorage.getItem('token');

    try {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            body: JSON.stringify({ position })
        };

        const apiUrl = "http://localhost:5000/api/driver/driver_current_location";

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data.message);

            // console.log(data.current_location);
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}


export { fetchUpdateDriverCurrentLocation };