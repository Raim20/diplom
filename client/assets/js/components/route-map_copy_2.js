const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 43.235, lng: 76.9 },
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    zoomControl: true,
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
    gestureHandling: "greedy"
});

const startInput = document.getElementById("start-input");
const endInput = document.getElementById("end-input");

const startDeleteButton = document.getElementById("start-delete");
const endDeleteButton = document.getElementById("end-delete");

const startAutocomplete = new google.maps.places.Autocomplete(startInput);
const endAutocomplete = new google.maps.places.Autocomplete(endInput);

startAutocomplete.bindTo("bounds", map);
endAutocomplete.bindTo("bounds", map);

var markers = [];
var routePath = null;
var decodedPath;

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


    // const routePath = new google.maps.Polyline({
    //     path: routeCoordinates,
    //     geodesic: true,
    //     strokeColor: '#3887be',
    //     strokeOpacity: 0.75,
    //     strokeWeight: 6
    // });
    // routePath.setMap(map);

    const bounds = new google.maps.LatLngBounds();
    decodedPath.forEach(point => bounds.extend(point));
    map.fitBounds(bounds);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function createMarker(latLng) {
    // const place = autocomplete.getPlace();
    // if (!place.geometry) {
    //     return;
    // }

    // if (marker) {
    //     marker.setMap(null);
    // }

    var color = markers.length === 0 ? '#a3c2c2' : '#0a4f6b';

    var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        draggable: true,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: color,
            fillOpacity: 1,
            strokeWeight: 0,
            scale: 8
        }
    });

    // var marker = new google.maps.Marker({
    //     position: latLng,
    //     map: map,
    //     draggable: true,
    //     icon: {
    //         path: google.maps.SymbolPath.CIRCLE,
    //         fillColor: color,
    //         fillOpacity: 1,
    //         strokeWeight: 0,
    //         scale: 8
    //     }
    // });

    markers.push(marker);

    if (markers.length === 2) {
        var coordinates = markers.map(function(marker) {
            return marker.getPosition();
        });
        console.log(coordinates);
    }

    google.maps.event.addListener(marker, 'dragend', function() {
        updateRoute(marker);
    });

    google.maps.event.addListener(marker, 'click', function() {
        deleteMarker(this);
    });

    map.panTo(marker.position);
}

function updateRoute() {
    if (markers.length === 2) {
        var coordinates = markers.map(marker => marker.getPosition());
        fetchRouteData(coordinates);
    }
}

function limitMarkers(newLatLng) {
    if (markers.length >= 2) {
        console.warn('Максимальное количество маркеров: 2');
        return;
    }

    createMarker(newLatLng);

    if (markers.length === 2) {
        updateRoute();
    }
}

function getAddressFromLatLng(latlng) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'location': latlng }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                console.log(results[0].formatted_address);
                // Здесь вы можете использовать полученный адрес
            } else {
                console.log('Адрес не найден');
            }
        } else {
            console.log('Ошибка геокодирования: ' + status);
        }
    });
}


map.addListener('click', function(e) {
    limitMarkers(e.latLng);
    getAddressFromLatLng(e.latLng);
});

// startAutocomplete.addListener("place_changed", function() {
//     const place = startAutocomplete.getPlace();
//     if (!place.geometry) {
//         return;
//     }

//     if (startMarker) {
//         startMarker.setMap(null);
//     }

//     startMarker = new google.maps.Marker({
//         map: map,
//         position: place.geometry.location
//     });
//     map.panTo(place.geometry.location);
// });

function handlePlaceChanged(autocomplete, marker) {
    const place = autocomplete.getPlace();
    if (!place.geometry) {
        return;
    }

    if (marker) {
        marker.setMap(null);
    }

    createMarker(place.geometry.location);
    if (markers.length === 2) {
        updateRoute();
    }
}


startAutocomplete.addListener("place_changed", function() {
    // const place = startAutocomplete.getPlace();
    // if (!place.geometry) {
    //     return;
    // }

    // if (startMarker) {
    //     startMarker.setMap(null);
    // }

    handlePlaceChanged(startAutocomplete, markers[0]);
});

endAutocomplete.addListener("place_changed", function() {
    handlePlaceChanged(endAutocomplete, markers[1]);
});

function deleteAllMarkers(marker) {
    marker.setMap(null);
    markers = markers.filter(m => m !== marker);
    if (markers.length === 2) {
        updateRoute();
    }
}

function deleteMarker(marker, input) {
    if (marker) {
        marker.setMap(null);
        input.value = "";
    }

    if (routePath) {
        routePath.setMap(null);
    }

    if (marker.icon.fillColor === '#a3c2c2') {
        map.panTo(markers[1].getPosition());
    } else {
        map.panTo(markers[0].position);
    }
}

startDeleteButton.addEventListener("click", function() {
    deleteMarker(markers[0], startInput);
});

endDeleteButton.addEventListener("click", function() {
    deleteMarker(markers[1], endInput);
});




// function limitMarkers(newLngLat) {
//     if (markers.length >= 2) {
//         console.warn('Максимальное количество маркеров: 2');
//         return;
//     }

//     createMarker(newLngLat);

//     if (markers.length === 2) {
//         updateRoute();
//     }
// }

// map.addListener('click', function(e) {
//     limitMarkers(e.latLng);
// });

async function fetchRouteData(markers) {
    try {
        if (!markers || markers.length !== 2) {
            console.error('Ошибка: Не удалось получить координаты маршрута');
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ start: markers[0], end: markers[1] })
        };

        const apiUrl = "http://localhost:5000/api/map";

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data.map_data);
            decodedPath = data.map_data.map(point => ({ lat: point.lat, lng: point.lng }));

            displayRoute(data.map_data);
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

function searchLocation() {
    const location = document.getElementById("location-input").value;
    const messageElement = document.getElementById("message");
    messageElement.style.display = "none";

    if (!location) {
        showMessage("Введите название местности", "error");
        return;
    }

    geocoder.geocode({ address: location }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            const location = results[0].geometry.location;
            map.setCenter(location);
            addMarker(location);
            showMessage("Местность найдена", "success");
        } else {
            showMessage("Местность не найдена", "error");
        }
    });
}

function showMessage(message, type) {
    const messageElement = document.getElementById("message");
    messageElement.textContent = message;
    messageElement.className = type;
    messageElement.style.display = "block";
}

// function geocodeAddress() {
//     const geocoder = new google.maps.Geocoder();
//     const address = document.getElementById('locationInput').value;

//     geocoder.geocode({ 'address': address }, function(results, status) {
//         if (status === 'OK') {
//             const location = results[0].geometry.location;
//             limitMarkers(location);
//         } else {
//             console.error('Геокодирование не удалось по следующей причине: ' + status);
//         }
//     });
// }