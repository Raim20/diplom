import { map } from "./init_map.js";
import { startMarker, endMarker, limitMarkers } from "./create_marker.js";
import { deleteMarker } from "./delete_marker.js";
import { getCurrentPosition } from "./get_current_position.js";
import { startTrackingLocation } from "./get_position.js";

const startDeleteButton = document.getElementById("start-delete");
const endDeleteButton = document.getElementById("end-delete");
const get_current_position = document.getElementById('get_current_position');
const get_start_tracking_location = document.getElementById('get_start_tracking_location');

map.addListener('click', function(e) {
    limitMarkers(e.latLng);
    // getAddressFromLatLng(e.latLng);
});

startDeleteButton.addEventListener("click", function() {
    if (startMarker) {
        deleteMarker("startMarker");
    }
});

endDeleteButton.addEventListener("click", function() {
    if (endMarker) {
        deleteMarker("endMarker");
    }
});

// get_start_tracking_location.addEventListener('click', () => {
//     getCurrentPosition();
// });

// get_current_position.addEventListener('click', () => {
//     startTrackingLocation();
// });