import { map } from "./init_map.js";
import { fetchRouteData } from "./get_path_route_final.js";
import { fetchGetNearbyOrders } from "./get_nearby_orders_final.js";

class MarkersFuntion {
    constructor(map) {
        this.map = map;
        this.marker = [2];
        this.markers = null;
        this.selected_marker = null;
        this.route_path = null;
        this.icon_options = {
            deselectedMarker: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: this.getRandomColor(),
                fillOpacity: 1,
                strokeWeight: 0,
                scale: 8
            },
            selectedMarker: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: this.getRandomColor(),
                fillOpacity: 1,
                strokeWeight: 0,
                scale: 10
            }
        };
    }

    create_marker(position, order) {
        const marker = new google.maps.Marker({
            position: position,
            map: this.map,
            title: `Order: ${order.name}, Price: ${order.price}`,
            icon: this.icon_options.deselectedMarker,
        });

        // marker.addListener('click', () => {
        //     fetchRouteData(order.pickupLocation, order.destination)
        //         .then(route => {
        //             this.hideAllMarkersExcept(marker);
        //             this.display_route(route);
        //             this.highlightMarker(marker);
        //         });
        //     // this.hideAllMarkersExcept(marker);
        //     // this.display_route(order.route);
        // });
        
        marker.addListener('click', async () => {
            const route = await fetchRouteData(order.pickupLocation, order.destination);
            if (route) {
                this.hideAllMarkersExcept(marker);
                this.display_route(route);
                this.highlightMarker(marker);
            }
        });

        return marker;
    }

    showAllMarkers() {
        this.markers.forEach(marker => marker.setMap(this.map));
    }

    hideAllMarkersExcept(selectedMarker) {
        this.markers.forEach(marker => {
            if (marker !== selectedMarker) {
                marker.setMap(null);
            }
        });
    }

    // hideAllMarkersExcept() {
    //     this.markers.forEach(marker => {
    //         marker.setMap(null);
    //     });
    // }
    
    // delete_marker(type) {
    //     if (type === "startMarker") {
    //         this.start_marker.setMap(null);
    //         this.start_marker = null;
    //     }
    // }

    delete_all_markers() {
        this.markers.forEach(marker => marker.setMap(null));
        this.markers = [];
    }

    // delete_marker_and_clear_route_path(type) {
    //     this.delete_marker(type);

    //     if (this.route_path) {
    //         this.clear_route_path();
    //     }
    // }

    clear_route_path() {
        if (this.route_path) {
            this.route_path.setMap(null);
            this.route_path = null;
        }
    }

    display_route(route_coordinates) {
        if (this.route_path) {
            this.clear_route_path();
        }
    
        this.route_path = new google.maps.Polyline({
            path: route_coordinates,
            geodesic: true,
            strokeColor: '#3887be',
            strokeOpacity: 0.75,
            strokeWeight: 6
        });

        this.route_path.setMap(this.map);
        
        const bounds = new google.maps.LatLngBounds();
        route_coordinates.forEach(point => bounds.extend(point));
        this.map.fitBounds(bounds);
    }
    
    highlightMarker(marker) {
        this.markers.forEach(m => m.setIcon(this.icon_options.deselectedMarker));
        marker.setIcon(this.icon_options.selectedMarker);
        this.selected_marker = marker;
    }

    // cheker_location(address, check) {
    //     if (check === "startMarker") {
    //         return Boolean(address);
    //     } else if (check === "endMarker") {
    //         return Boolean(address);
    //     } else {
    //         return false;
    //     }
    // }
    
    // hideAllMarkersExcept() {
    //     this.markers.forEach(marker => {
    //         marker.setMap(null);
    //     });
    // }
    
    // showAllMarkers() {
    //     this.markers.forEach(marker => marker.setMap(this.map));
    // }
    
    // selectOrder(order) {
    //     if (selectedOrder) {
    //         const prevSelectedOrderMarker = ordersMarkers.find(marker => marker.getTitle().includes(selectedOrder.id));
    //         prevSelectedOrderMarker.setIcon(null);
    //     }
    
    //     const selectedOrderMarker = ordersMarkers.find(marker => marker.getTitle().includes(order.id));
    //     selectedOrderMarker.setIcon({
    //         path: google.maps.SymbolPath.CIRCLE,
    //         fillColor: '#00FF00',
    //         fillOpacity: 1,
    //         strokeWeight: 0,
    //         scale: 10,
    //     });
    
    //     selectedOrder = order;
    // }
    
    // showRouteForOrder(routeCoordinates) {
    //     if (this.route_path) {
    //         this.clear_route_path();
    //     }
    
    //     route_path = new google.maps.Polyline({
    //         path: routeCoordinates,
    //         geodesic: true,
    //         strokeColor: '#3887be',
    //         strokeOpacity: 0.75,
    //         strokeWeight: 6,
    //     });
    //     route_path.setMap(map);
    
    //     const bounds = new google.maps.LatLngBounds();
    //     routeCoordinates.forEach(point => bounds.extend(point));
    //     map.fitBounds(bounds);
    //     // Реализуйте логику для отображения маршрута на карте для выбранного заказа
    // }
    
    // deleteRouteForOrder(order, orders) {
    //     if (route_path) {
    //         this.clear_route_path();
    //     }
        
    //     this.showAllMarkers();
    //     fetchGetNearbyOrders();
    //     // displayOrdersOnMap(orders);
    //     // Реализуйте логику для удаления маршрута выбранного заказа с карты
    // }

    // deleteRouteAndShowAllMarkers() {
    //     if (route_path) {
    //         this.clear_route_path();
    //     }

    //     this.showAllMarkers();
    //     fetchGetNearbyOrders();
    // }

    deleteRouteAndShowAllMarkers() {
        if (this.route_path) {
            this.clear_route_path();
        }
        
        this.showAllMarkers();
        fetchGetNearbyOrders()
            .then(orders => this.displayOrdersOnMap(orders));
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // displayOrdersOnMap(orders) {
    //     ordersMarkers.forEach(marker => marker.setMap(null));
    //     ordersMarkers = [];
    
    //     orders.forEach(order => {
    //         const marker = new google.maps.Marker({
    //             position: { lat: order.pickupLocation[0], lng: order.pickupLocation[1] },
    //             map: map,
    //             title: `Order ID: ${order.id}`,
    //             icon: {
    //                 path: google.maps.SymbolPath.CIRCLE,
    //                 fillColor: getRandomColor(),
    //                 fillOpacity: 1,
    //                 strokeWeight: 0,
    //                 scale: 8,
    //             },
    //         });
    
    //         ordersMarkers.push(marker);
    
    //         marker.addListener('click', () => {
    //             fetchRouteData(order.pickupLocation, order.destination);
    //             hideAllMarkersExcept();
    //         });
    //     });
    // }

    displayOrdersOnMap(orders) {
        this.delete_all_markers();

        orders.forEach(order => {
            const position = { lat: order.pickupLocation[0], lng: order.pickupLocation[1] };
            const marker = this.create_marker(position, order);

            this.markers.push(marker);
        });
    }
}


const Markers = new MarkersFuntion(map);

export { Markers };



// import { map } from "./init_map.js";
// import { fetchGetDriversData } from "./get_drivers_data.js";

// async function updateDriversLocationOnMap() {
//     const driversData = await fetchGetDriversData();
//     if (!driversData) {
//         return;
//     }

//     driversData.forEach(async (driver) => {
//         const driverPosition = { lat: driver.latitude, lng: driver.longitude };
//         const driverMarker = driversMarkersMap.get(driver.id);

//         if (driverMarker) {
//             driverMarker.setPosition(driverPosition);
//         } else {
//             const newDriverMarker = new google.maps.Marker({
//                 position: driverPosition,
//                 map: map,
//                 title: driver.name
//             });
//             driversMarkersMap.set(driver.id, newDriverMarker);
//         }
//     });
// }

// const updateInterval = setInterval(updateDriversLocationOnMap, 1000);

// Остановить обновление местоположения водителей (например, при закрытии страницы)
// clearInterval(updateInterval);
