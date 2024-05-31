// import { map } from "./init_map.js";
// import { getAddressFromLatLng } from "./get_address_from_latlng.js";
import { Markers } from "./display_drivers_on_map_final.js";

function getAddressFromLatLng(latlng, check, callback) {
    var geocoder = new google.maps.Geocoder();
    let address = "";
    geocoder.geocode({ 'location': latlng }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                address = results[0].formatted_address;
                console.log(address);
            } else {
                console.log('Адрес не найден');
            }
        } else {
            console.log('Ошибка геокодирования: ' + status);
        }
        if (callback) {
            callback(address, check);
        }
    });
}

function printNearbyOrders(orders) {
    const ordersList = document.getElementById('orders');
    const loadingIndicator = document.getElementById('loading-indicator');
    ordersList.innerHTML = '';
    loadingIndicator.style.display = 'block';

    orders.forEach(order => {
        const orderItem = `
            <div class="user_item_style">
                <div class="user_item_stats">
                    <div class="user_item_info">
                        <div class="user_item_name_1">Customer: ${order.userName}</div>
                        <div class="user_item_price_1">Fare: ${order.fare}</div>
                    </div>
                    <div class="user_item_location_1">Location: </div>
                    <div class="user_item_location_content_1">Pickup Location: ${getAddressFromLatLng(order.pickupLocation, "startMarker", cheker_location)}</div>
                    <div class="user_item_location_content_1">Destination: ${getAddressFromLatLng(order.destination, "endMarker", cheker_location)}</div>
                    <button class="show-route-btn">Show Route</button>
                    <button class="delete-route-btn">Delete Route</button>
                </div>
            </div>`;
        ordersList.innerHTML += orderItem;
    });

    // orders.forEach(order => {
    //     const orderItem = `
    //         <div class="user_item_style">
    //             <div class="user_item_stats">
    //                 <div class="user_item_info">
    //                     <div class="user_item_name">Customer: ${order.userName}</div>
    //                     <div class="user_item_price">Fare: ${order.fare}</div>
    //                 </div>
    //                 <div class="user_item_location">Location: </div>
    //                 <div class="user_item_location_content">Pickup Location: ${getAddressFromLatLng(order.pickupLocation, "startMarker", cheker_location)}</div>
    //                 <div class="user_item_location_content">Destination: ${getAddressFromLatLng(order.destination, "endMarker", cheker_location)}</div>
    //                 <button class="show-route-btn">Show Route</button>
    //                 <button class="delete-route-btn">Delete Route</button>
    //             </div>
    //         </div>`;
    //     ordersList.innerHTML += orderItem;
    // });
    
    loadingIndicator.style.display = 'none';

    const showRouteBtns = document.querySelectorAll('.show-route-btn');
    const deleteRouteBtns = document.querySelectorAll('.delete-route-btn');

    showRouteBtns.forEach(btn => {
        btn.addEventListener('click', async (event) => {
            const orderId = event.target.closest('.user_item_style').dataset.orderId;
            const order = orders.find(order => order.id === orderId);
            if (order) {
                const route = await fetchRouteData(order.pickupLocation, order.destination);
                if (route) {
                    Markers.hideAllMarkersExcept(order.pickupLocation);
                    Markers.display_route(route);
                }
            }
        });
    });

    deleteRouteBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            const orderId = event.target.closest('.user_item_style').dataset.orderId;
            const order = orders.find(order => order.id === orderId);
            if (order) {
                Markers.deleteRouteAndShowAllMarkers();
            }
        });
    });
}

function cheker_location(address, check) {
    if (check === "startMarker") {
        return Boolean(address);
    } else if (check === "endMarker") {
        return Boolean(address);
    } else {
        return false;
    }
}


export { printNearbyOrders, getAddressFromLatLng };


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
            
//             new google.maps.Marker({
//                 position: startMarker,
//                 map: map,
//                 title: `Order ID: ${order.id}`,
//                 icon: {
//                     path: google.maps.SymbolPath.CIRCLE,
//                     fillColor: getRandomColor(),
//                     fillOpacity: 1,
//                     strokeWeight: 0,
//                     scale: 10,
//                 },
//             });
//             new google.maps.Marker({
//                 position: endMarker,
//                 map: map,
//                 title: `Order ID: ${order.id}`,
//                 icon: {
//                     path: google.maps.SymbolPath.CIRCLE,
//                     fillColor: getRandomColor(),
//                     fillOpacity: 1,
//                     strokeWeight: 0,
//                     scale: 10,
//                 },
//             });

//             showRouteForOrder(data.map_data);
//         } else {
//             console.error(data.message);
//         }
//     } catch (error) {
//         console.error('Ошибка:', error);
//     }
// }