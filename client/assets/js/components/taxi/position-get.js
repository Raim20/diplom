import { temp_map } from "../route-map_copy_2 copy.js";

const getLocationBtn = document.getElementById('getLocation');

function startTrackingLocation(userId) {
    if (navigator.geolocation) {
        watchId = navigator.geolocation.watchPosition(position => {
            const location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            const temp_location = { lat: location.latitude, lng: location.longitude };
            // updateMarker(userId, location);
            // sendLocationToServer(userId, location);
            console.log(location);
            console.log(temp_location);
            showLocationOnMap(temp_location);
        }, showError, {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 1000
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition, showError);
//     } else {
//         alert("Geolocation is not supported by this browser.");
//     }
// }

getLocationBtn.addEventListener('click', startTrackingLocation);

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const location = { lat: latitude, lng: longitude };

    showLocationOnMap(location);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

function showLocationOnMap(location) {
    const marker = new google.maps.Marker({
        position: location,
        map: temp_map,
        title: "Your Location",
    });
}

