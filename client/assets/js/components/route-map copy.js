mapboxgl.accessToken = 'pk.eyJ1IjoicmFpbW1lZ2EiLCJhIjoiY2x2NDlndGJoMDZtZzJpcjJkaWNrdDVsOSJ9.Y9he5g5b_LeHk8qXQgtnnA';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [76.9, 43.235],
    zoom: 12,
    dragRotate: false
});

var markers = [];

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function createMarker(lngLat) {
    // var color = getRandomColor();
    var color = markers.length === 0 ? '#a3c2c2' : '#0a4f6b';
    var marker = new mapboxgl.Marker({
            draggable: true,
            color: color
        })
        .setLngLat(lngLat)
        .addTo(map);

    markers.push(marker);

    if (markers.length === 2) {
        var coordinates = markers.map(function(marker) {
            return marker.getLngLat();
        });
        console.log(coordinates);
    }

    // marker.on('drag', function() {
    //     updateMarkerData(marker);
    // });

    marker.on('dragend', function() {
        updateRoute(marker);
    });

    marker.on('click', function() {
        deleteMarker(this);
    });
}

// function updateMarkerData(marker) {
//     var newLngLat = marker.getLngLat();
//     for (var i = 0; i < markers.length; i++) {
//         if (markers[i].marker === marker) {
//             markers[i].lngLat = newLngLat;
//             break;
//         }
//     }
// }

function updateRoute() {
    if (markers.length === 2) {
        var coordinates = markers.map(marker => marker.getLngLat());
        fetchRouteData(coordinates);
    }
}

function limitMarkers(newLngLat) {
    if (markers.length >= 2) {
        console.warn('Максимальное количество маркеров: 2');
        return;
    }

    createMarker(newLngLat);

    if (markers.length === 2) {
        updateRoute();
    }

    // if (markers.length === 2) {
    //     var coordinates = markers.map(function(marker) {
    //         return marker.getLngLat();
    //     });
    //     console.log(coordinates);
    //     fetchRouteData(coordinates);

    //     markers = [];
    // }
}

map.on('click', function(e) {
    limitMarkers(e.lngLat);
});

// function deleteMarker(marker) {
//     marker.remove();

//     for (var i = 0; i < markers.length; i++) {
//         if (markers[i].marker === marker) {
//             markers.splice(i, 1);
//             break;
//         }
//     }
// }

function deleteMarker(marker) {
    marker.remove();
    markers = markers.filter(m => m !== marker);
    if (markers.length === 2) {
        updateRoute();
    }
}

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

            if (data.map_data) {
                console.log('first');
                const geojson = {
                    type: 'Feature',
                    geometry: {
                        type: 'LineString',
                        coordinates: data.map_data
                    },
                    properties: {
                        name: 'Route'
                    }
                };

                if (map.getSource('route')) {
                    console.log('second');
                    map.getSource('route').setData(geojson);
                } else {
                    console.log('third');
                    map.addLayer({
                        id: 'route',
                        type: 'line',
                        source: {
                            type: 'geojson',
                            data: geojson
                        },
                        layout: {
                            'line-join': 'round',
                            'line-cap': 'round'
                        },
                        paint: {
                            'line-color': '#3887be',
                            'line-width': 6,
                            'line-opacity': 0.75
                        }
                    });
                }

                // var bounds = geojson.geometry.bbox;
                // map.fitBounds(bounds, {
                //     padding: 20
                // });

                // markers.forEach(marker => marker.remove());
                // markers = [];
                // map.fitBounds([
                //     [start.lng, start.lat],
                //     [end.lng, end.lat]
                // ]);
            } else {
                console.error('No route found');
            }
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

//     // var bounds = new mapboxgl.LngLatBounds();
//     // route.geometry.coordinates.forEach(function(coord) {
//     //     bounds.extend(coord);
//     // });
//     // map.fitBounds(bounds, {
//     //     padding: 20
//     // });
// }