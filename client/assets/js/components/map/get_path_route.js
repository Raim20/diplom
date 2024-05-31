import { map } from "./init_map.js";
import { startMarker, endMarker } from "./create_marker.js";
import { fetchGetFareCurrentUserOrder } from "../taxi/get-fare-current-user-order.js";


async function fetchRouteData(startMarker, endMarker) {
    try {
        if (!startMarker || !endMarker) {
            console.error('Ошибка: Не удалось получить координаты маршрута');
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ start: startMarker.position, end: endMarker.position })
        };

        const apiUrl = "http://localhost:5000/api/map";

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data.map_data);
            // decodedPath = data.map_data.map(point => ({ lat: point.lat, lng: point.lng }));

            displayRoute(data.map_data);
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

var routePath = null;
// var decodedPath;

let pickupLocation = {
    coordinates: []
};
let destination = {
    coordinates: []
};

function displayRoute(routeCoordinates) {
    if (routePath) {
        routePath.setMap(null);
    }

    routePath = new google.maps.Polyline({
        path: routeCoordinates,
        geodesic: true,
        strokeColor: '#3887be',
        strokeOpacity: 0.75,
        strokeWeight: 6
    });
    routePath.setMap(map);

    const bounds = new google.maps.LatLngBounds();
    routeCoordinates.forEach(point => bounds.extend(point));
    map.fitBounds(bounds);

    pickupLocation = {
        coordinates: [startMarker.getPosition().lat, startMarker.getPosition().lng]
    };
    destination = {
        coordinates: [endMarker.getPosition().lat, endMarker.getPosition().lng]
    };

    fetchGetFareCurrentUserOrder(pickupLocation, destination);
}


export { routePath, fetchRouteData, displayRoute };






// import { displayRoute } from "./route.js";


// async function fetchRouteData(startMarker, endMarker) {
//     try {
//         if (!startMarker || !endMarker) {
//             console.error('Ошибка: Не удалось получить координаты маршрута');
//             return;
//         }

//         const requestOptions = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ start: startMarker.position, end: endMarker.position })
//         };

//         const apiUrl = "http://localhost:5000/api/map";

//         const response = await fetch(apiUrl, requestOptions);
//         const data = await response.json();

//         if (response.ok) {
//             console.log(data.map_data);
//             // decodedPath = data.map_data.map(point => ({ lat: point.lat, lng: point.lng }));

//             displayRoute(data.map_data);
//         } else {
//             console.error(data.message);
//         }
//     } catch (error) {
//         console.error('Ошибка:', error);
//     }
// }


// export { fetchRouteData };

