// import { map } from "./init_map.js";
// import { Marker } from "./get_marker_class.js";
// import { fetchGetFareCurrentUserOrder } from "../taxi/get-fare-current-user-order.js";


async function fetchRouteData(start_marker_position, end_marker_position) {
    try {
        if (!start_marker_position || !end_marker_position) {
            console.error('Ошибка: Не удалось получить координаты маршрута');
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ start: start_marker_position, end: end_marker_position })
        };

        const apiUrl = "http://localhost:5000/api/map";

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data.map_data);

            // return data.map_data;

            // Marker.display_route(data.map_data);

            const route = data.map_data;

            return route;
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}



export { fetchRouteData };






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

