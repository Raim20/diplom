export async function fetchGetDriversData() {
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

        const apiUrl = "http://localhost:5000/api/map/drivers_locations";

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data.message);
            console.log(data.drivers_current_locations);

            return data.drivers_current_locations;
        } else {
            console.error(data.message);
            return null;
        }
    } catch (error) {
        console.error('Ошибка:', error);
        return null;
    }
}