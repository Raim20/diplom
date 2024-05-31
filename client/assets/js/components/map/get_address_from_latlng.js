import { startInput, endInput } from "./autocomplete_input.js";

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

function updateInputValue(address, check) {
    if (check === "startMarker") {
        startInput.value = address;
    } else if (check === "endMarker") {
        endInput.value = address;
    }
}

export { getAddressFromLatLng, updateInputValue };

