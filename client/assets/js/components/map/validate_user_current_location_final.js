import { map } from "./init_map.js";
// import { startMarker, endMarker } from "./create_marker.js";
// import { createMarker } from "./create_marker.js";
// import { getCurrentPosition } from "./get_current_position.js";
// import { getAddressFromLatLng, updateInputValue } from "./get_address_from_latlng.js";
import { Marker } from "./get_marker_class.js";
import { check_button } from "./action_event_handler_final.js";

function handleLocationError(browserHasGeolocation, pos) {
    const infoWindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: browserHasGeolocation
            ? 'Error: The Geolocation service failed.'
            : "Error: Your browser doesn't support geolocation."
    });
    map.setCenter(pos);
}

function getCurrentPosition(check) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userPos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                
                // showLocationOnMap(userPos, check);
                check_button(userPos, check);
            },
            () => {
                handleLocationError(true, map.getCenter());
            }
        );
    } else {
        handleLocationError(false, map.getCenter());
    }
}

// const getLocationButtons = document.querySelectorAll('.get_location');

// getLocationButtons.forEach(button => {
//     button.addEventListener('click', function() {
//         const check = button.id.includes('start') ? 'startMarker' : 'endMarker';
//         getCurrentPosition(check);
//     });
// });

// function check_button(userPos, check) {
//     if (check === "startMarker") {
//         if (Marker.start_marker) {
//             // Marker.delete_marker(check);
//             Marker.set_start_marker_position(userPos);
//         }
//         Marker.set_start_marker(userPos);
//     } else if (check === "endMarker") {
//         if (Marker.end_marker) {
//             // Marker.delete_marker(check);
//             Marker.set_end_marker_position(userPos);
//         }
//         Marker.set_end_marker(userPos);
//     }
// }

function showLocationOnMap(userPos, check) {
    console.log(userPos);

    if (check === "startMarker") {
        if (startMarker) {
            deleteMarker(startMarker);
        }
        startMarker = createMarker(userPos);
    } else if (check === "endMarker") {
        if (endMarker) {
            deleteMarker(endMarker);
        }
        endMarker = createMarker(userPos);
    }


    getAddressFromLatLng(userPos, check, (address, check) => {
        updateInputValue(address, check);
    });
}


export { getCurrentPosition, showLocationOnMap };