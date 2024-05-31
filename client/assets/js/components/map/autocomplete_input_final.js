import { startMarker, endMarker, updateRoute } from "./create_marker.js";
import { Marker } from "./get_marker_class_final.js";

const startInput = document.getElementById("start-input");
const endInput = document.getElementById("end-input");

const startAutocomplete = new google.maps.places.Autocomplete(startInput);
const endAutocomplete = new google.maps.places.Autocomplete(endInput);

startAutocomplete.setFields(['formatted_address']);
endAutocomplete.setFields(['formatted_address']);

startAutocomplete.setOptions({ componentRestrictions: { country: 'kz' } });
endAutocomplete.setOptions({ componentRestrictions: { country: 'kz' } });

startAutocomplete.bindTo("bounds", map);
endAutocomplete.bindTo("bounds", map);


function handlePlaceChanged(autocomplete, marker) {
    const place = autocomplete.getPlace();
    if (!place.geometry) {
        return;
    }

    if (marker) {
        marker.setMap(null);
    }

    Marker.create_marker(place.geometry.location);
    if (Marker.get_start_marker() && Marker.get_end_marker()) {
        Marker.updateRoute();
    }
}


startAutocomplete.addListener("place_changed", function() {
    handlePlaceChanged(startAutocomplete, Marker.get_start_marker());
});

endAutocomplete.addListener("place_changed", function() {
    handlePlaceChanged(endAutocomplete, Marker.get_end_marker());
});


export { startInput, endInput };


