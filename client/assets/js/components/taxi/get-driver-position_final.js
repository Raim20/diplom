async function fetchGetDriverCurrentLocation() {
    const token = localStorage.getItem('token');

    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
        };

        const apiUrl = "http://localhost:5000/api/driver/driver_current_location";

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data.message);

            console.log(data.driver_current_location);
            
            return data.driver_current_location;
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}


export { fetchGetDriverCurrentLocation };