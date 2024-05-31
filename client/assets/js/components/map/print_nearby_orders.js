import { map } from "./init_map.js";
// import { fetchGetNearbyOrders } from "./get_nearby_orders.js";
import { fetchGetNearbyOrders } from "./get_nearby_orders.js";
import { getAddressFromLatLng } from "./get_address_from_latlng.js";

let ordersMarkers = [];
let selectedOrder = null;
var route_path = null;

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
            
            new google.maps.Marker({
                position: startMarker,
                map: map,
                title: `Order ID: ${order.id}`,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: getRandomColor(),
                    fillOpacity: 1,
                    strokeWeight: 0,
                    scale: 10,
                },
            });
            new google.maps.Marker({
                position: endMarker,
                map: map,
                title: `Order ID: ${order.id}`,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: getRandomColor(),
                    fillOpacity: 1,
                    strokeWeight: 0,
                    scale: 10,
                },
            });

            showRouteForOrder(data.map_data);
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}


function printNearbyOrders(orders) {
    const ordersList = document.getElementById('orders');
    ordersList.innerHTML = '';

    orders.forEach(order => {
        const orderItem = `
            <div class="user_item_style">
                <div class="user_item_stats">
                    <div class="user_item_info">
                        <div class="user_item_name">Customer: ${order.userName}</div>
                        <div class="user_item_price">Fare: ${order.fare}</div>
                    </div>
                    <div class="user_item_location">Location: </div>
                    <div class="user_item_location_content">Pickup Location: ${getAddressFromLatLng(order.pickupLocation, "startMarker", cheker_location)}</div>
                    <div class="user_item_location_content">Destination: ${getAddressFromLatLng(order.destination, "endMarker", cheker_location)}</div>
                    <button class="show-route-btn">Show Route</button>
                    <button class="delete-route-btn">Delete Route</button>
                </div>
            </div>`;
        ordersList.innerHTML += orderItem;
    });

    const showRouteBtns = document.querySelectorAll('.show-route-btn');
    const deleteRouteBtns = document.querySelectorAll('.delete-route-btn');

    showRouteBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            const orderId = event.target.closest('.user_item_style').dataset.orderId;
            const order = orders.find(order => order.id === orderId);
            if (order) {
                fetchRouteData(order.pickupLocation, order.destination);
                hideAllMarkersExcept();
                // hideAllMarkersExcept(order.id);
            }
        });
    });

    deleteRouteBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            const orderId = event.target.closest('.user_item_style').dataset.orderId;
            const order = orders.find(order => order.id === orderId);
            if (order) {
                deleteRouteForOrder(order, orders);
            }
        });
    });

    // orders.forEach(order => {
    //     const listItem = document.createElement('li');
    //     listItem.innerHTML = `
    //         <div class="order-id">Order ID: ${order.id}</div>
    //         <div class="user-name">Customer: ${order.userName}</div>
    //         <div class="order-status">Fare: ${order.fare}</div>
    //     `;
    //     ordersList.appendChild(listItem);
    // });
}


// function hideAllMarkersExcept(orderId) {
//     ordersMarkers.forEach(marker => {
//         if (!marker.getTitle().includes(orderId)) {
//             marker.setMap(null);
//         }
//     });
// }

function cheker_location(address, check) {
    if (check === "startMarker") {
        return Boolean(address);
    } else if (check === "endMarker") {
        return Boolean(address);
    } else {
        return false;
    }
}

function hideAllMarkersExcept() {
    ordersMarkers.forEach(marker => {
        marker.setMap(null);
    });
}

function showAllMarkers() {
    ordersMarkers.forEach(marker => marker.setMap(map));
}


function selectOrder(order) {
    if (selectedOrder) {
        const prevSelectedOrderMarker = ordersMarkers.find(marker => marker.getTitle().includes(selectedOrder.id));
        prevSelectedOrderMarker.setIcon(null);
    }

    const selectedOrderMarker = ordersMarkers.find(marker => marker.getTitle().includes(order.id));
    selectedOrderMarker.setIcon({
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#00FF00',
        fillOpacity: 1,
        strokeWeight: 0,
        scale: 10,
    });

    selectedOrder = order;
}

function showRouteForOrder(routeCoordinates) {
    if (route_path) {
        route_path.setMap(null);
        route_path = null;
    }

    route_path = new google.maps.Polyline({
        path: routeCoordinates,
        geodesic: true,
        strokeColor: '#3887be',
        strokeOpacity: 0.75,
        strokeWeight: 6,
    });
    route_path.setMap(map);

    const bounds = new google.maps.LatLngBounds();
    routeCoordinates.forEach(point => bounds.extend(point));
    map.fitBounds(bounds);
    // Реализуйте логику для отображения маршрута на карте для выбранного заказа
}

function deleteRouteForOrder(order, orders) {
    if (route_path) {
        route_path.setMap(null);
        route_path = null;
    }
    
    showAllMarkers();
    fetchGetNearbyOrders();
    // displayOrdersOnMap(orders);
    // Реализуйте логику для удаления маршрута выбранного заказа с карты
}


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function displayOrdersOnMap(orders) {
    ordersMarkers.forEach(marker => marker.setMap(null));
    ordersMarkers = [];

    orders.forEach(order => {
        const marker = new google.maps.Marker({
            position: { lat: order.pickupLocation[0], lng: order.pickupLocation[1] },
            map: map,
            title: `Order ID: ${order.id}`,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: getRandomColor(),
                fillOpacity: 1,
                strokeWeight: 0,
                scale: 8,
            },
        });

        ordersMarkers.push(marker);

        marker.addListener('click', () => {
            fetchRouteData(order.pickupLocation, order.destination);
            hideAllMarkersExcept();
            // hideAllMarkersExcept(order.id);
        });

        // marker.addListener('click', () => {
        //     selectOrder(order);
        // });

        // marker.addListener('click', () => {
        //     showRouteForOrder([{lat: order.pickupLocation[0], lng: order.pickupLocation[1]}, {lat: order.destination[0], lng: order.destination[1]}]);
        //     const marker = new google.maps.Marker({
        //         position: { lat: order.destination[0], lng: order.destination[1] },
        //         map: map,
        //         title: `Order ID: ${order.id}`,
        //         icon: {
        //             path: google.maps.SymbolPath.CIRCLE,
        //             fillColor: getRandomColor(),
        //             fillOpacity: 1,
        //             strokeWeight: 0,
        //             scale: 8
        //         }
        //     });
        // });
    });
}



export { printNearbyOrders, displayOrdersOnMap };
