import { map } from "./init_map.js";
import { startMarker, endMarker } from "./create_marker.js";
import { startInput, endInput } from "./autocomplete_input.js";
import { routePath } from "./get_path_route.js";

// const startDeleteButton = document.getElementById("start-delete");
// const endDeleteButton = document.getElementById("end-delete");

/* Удаление маркера */

function deleteAllMarkers(marker) {
    marker.setMap(null);
    markers = markers.filter(m => m !== marker);
    if (markers.length === 2) {
        updateRoute();
    }
}

export function deleteMarker(marker) {
    if (marker === "startMarker") {
        startMarker.setMap(null);
        startMarker = null;
        startInput.value = "";
        map.panTo(endMarker.getPosition());
    } else if (marker === "endMarker") {
        endMarker.setMap(null);
        endMarker = null;
        endInput.value = "";
        map.panTo(startMarker.position);
    }

    if (routePath) {
        routePath.setMap(null);
    }

    // if (startMarker) {
    //     map.panTo(startMarker.getPosition());
    // } else {
    //     map.panTo(endMarker.position);
    // }
}

// startDeleteButton.addEventListener("click", function() {
//     deleteMarker(startMarker);
// });

// endDeleteButton.addEventListener("click", function() {
//     deleteMarker(endMarker);
// });

export { startMarker, endMarker };
