import { initMap } from "./init_map.js";
import { startMarker, endMarker } from "./create_marker.js";
import { fetchGetFareCurrentUserOrder } from "../taxi/get-fare-current-user-order.js";

const map = initMap();

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


export { routePath, displayRoute };

