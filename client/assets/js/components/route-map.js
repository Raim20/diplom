// const mapboxgl = require('mapbox-gl');
// import mapboxgl from './mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoicmFpbW1lZ2EiLCJhIjoiY2x2NDlndGJoMDZtZzJpcjJkaWNrdDVsOSJ9.Y9he5g5b_LeHk8qXQgtnnA';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [76.9, 43.235],
    zoom: 12,
    dragRotate: false
});

var markers = [];

map.on('click', function(e) {
    if (markers.length < 2) {
        var marker = new mapboxgl.Marker()
            .setLngLat(e.lngLat)
            .addTo(map);

        markers.push(marker);
        // markers.push(e.lngLat.toArray());
    }
    // const coordinates = e.lngLat.toArray();
    // markers.push(coordinates);
    if (markers.length === 2) {
        var coordinates = markers.map(function(marker) {
            return marker.getLngLat();
        });
        console.log(coordinates);
        fetchRouteData(coordinates);
        // fetchRouteData(markers);
        markers = [];
    }
});

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
            // console.log(data.message);
            console.log(data.map_data);

            // displayRoute(data.map_data);

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
                            'line-width': 5
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

            // if (data.map_data) {
            //     const route = data.map_data;
            //     const geojson = {
            //       type: 'Feature',
            //       geometry: route.geometry,
            //       properties: {
            //         name: 'Route'
            //       }
            //     };

            //     const source = new mapboxgl.GeoJSONSource({
            //       data: geojson
            //     });

            //     const layer = new mapboxgl.Layer({
            //       id: 'route',
            //       type: 'line',
            //       source: source,
            //       layout: {
            //         'line-color': '#3887be',
            //         'line-width': 5
            //       },
            //       paint: {}
            //     });

            //     map.addLayer(layer);
            // }

            // map.addLayer({
            //     id: 'route',
            //     type: 'line',
            //     source: {
            //         type: 'geojson',
            //         data: {
            //             type: 'Feature',
            //             properties: {},
            //             geometry: {
            //                 type: 'LineString',
            //                 coordinates: data.map_data
            //             }
            //         }
            //     },
            //     layout: {
            //         'line-join': 'round',
            //         'line-cap': 'round'
            //     },
            //     paint: {
            //         'line-color': '#3887be',
            //         'line-width': 5
            //     }
            // });

            // if (map.getSource('route')) {
            //     map.getSource('route').setData({
            //         type: 'Feature',
            //         properties: {},
            //         geometry: {
            //             type: 'LineString',
            //             coordinates: data.map_data
            //         }
            //     });
            // } else {
            //     map.addLayer({
            //         id: 'route',
            //         type: 'line',
            //         source: {
            //             type: 'geojson',
            //             data: {
            //                 type: 'Feature',
            //                 properties: {},
            //                 geometry: {
            //                     type: 'LineString',
            //                     coordinates: data.map_data
            //                 }
            //             }
            //         },
            //         layout: {
            //             'line-join': 'round',
            //             'line-cap': 'round'
            //         },
            //         paint: {
            //             'line-color': '#3887be',
            //             'line-width': 5
            //         }
            //     });
            // }

            // if (map.getSource('route')) {
            //     map.getSource('route').setData(data.map_data);
            // } else {
            //     map.addLayer({
            //         id: 'route',
            //         type: 'line',
            //         source: {
            //             type: 'geojson',
            //             data: {
            //                 type: 'Feature',
            //                 properties: {},
            //                 geometry: data.map_data
            //             }
            //         },
            //         layout: {
            //             'line-join': 'round',
            //             'line-cap': 'round'
            //         },
            //         paint: {
            //             'line-color': '#3887be',
            //             'line-width': 5
            //         }
            //     });
            // }

            // map.addLayer({
            //     id: 'route',
            //     type: 'line',
            //     source: {
            //         type: 'geojson',
            //         data: {
            //             type: 'Feature',
            //             properties: {},
            //             geometry: data
            //         }
            //     },
            //     layout: {
            //         'line-join': 'round',
            //         'line-cap': 'round'
            //     },
            //     paint: {
            //         'line-color': '#3887be',
            //         'line-width': 8
            //     }
            // });
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

// function displayRoute(route) {
//     if (map.getSource('route')) {
//         map.removeLayer('route');
//         map.removeSource('route');
//     }
//     map.on('load', function() {
//         map.addLayer({
//             id: 'route',
//             type: 'line',
//             source: {
//                 type: 'geojson',
//                 data: route
//             },
//             layout: {
//                 'line-join': 'round',
//                 'line-cap': 'round'
//             },
//             paint: {
//                 'line-color': '#3887be',
//                 'line-width': 5
//             }
//         });
//     });

//     // var bounds = new mapboxgl.LngLatBounds();
//     // route.geometry.coordinates.forEach(function(coord) {
//     //     bounds.extend(coord);
//     // });
//     // map.fitBounds(bounds, {
//     //     padding: 20
//     // });
// }

// const routeForm = document.getElementById('routeForm');

// routeForm.addEventListener('submit', async (event) => {
//     event.preventDefault();
//     const start = document.getElementById('start').value;
//     const end = document.getElementById('end').value;

//     try {
//         const requestOptions = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ start: start, end: end })
//         };

//         const apiUrl = "http://localhost:5000/api/map";

//         const response = await fetch(apiUrl, requestOptions);
//         const data = await response.json();

//         if (response.ok) {
//             console.log(data.message);
//             console.log(data.map_data);
//             // map.addLayer({
//             //     id: 'route',
//             //     type: 'line',
//             //     source: {
//             //         type: 'geojson',
//             //         data: {
//             //             type: 'Feature',
//             //             properties: {},
//             //             geometry: data
//             //         }
//             //     },
//             //     layout: {
//             //         'line-join': 'round',
//             //         'line-cap': 'round'
//             //     },
//             //     paint: {
//             //         'line-color': '#3887be',
//             //         'line-width': 8
//             //     }
//             // });
//         } else {
//             console.error(data.message);
//         }
//     } catch {
//         console.error('Ошибка:', error);
//     }
// });



// const routeForm = document.getElementById('routeForm');

// routeForm.addEventListener('submit', async (event) => {
//     event.preventDefault();
//     const start = document.getElementById('start').value;
//     const end = document.getElementById('end').value;

//     try {
//         const requestOptions = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ start: start, end: end })
//         };

//         const apiUrl = "http://localhost:5000/api/map";

//         const response = await fetch(apiUrl, requestOptions);
//         const data = await response.json();

//         if (response.ok) {
//             console.log(data.message);
//             console.log(data.map_data);
//             // map.addLayer({
//             //     id: 'route',
//             //     type: 'line',
//             //     source: {
//             //         type: 'geojson',
//             //         data: {
//             //             type: 'Feature',
//             //             properties: {},
//             //             geometry: data
//             //         }
//             //     },
//             //     layout: {
//             //         'line-join': 'round',
//             //         'line-cap': 'round'
//             //     },
//             //     paint: {
//             //         'line-color': '#3887be',
//             //         'line-width': 8
//             //     }
//             // });
//         } else {
//             console.error(data.message);
//         }
//     } catch {
//         console.error('Ошибка:', error);
//     }

//     // fetch('/route', {
//     //     method: 'POST',
//     //     headers: {
//     //         'Content-Type': 'application/json'
//     //     },
//     //     body: JSON.stringify({ start: start, end: end })
//     // })
//     // .then(response => response.json())
//     // .then(data => {
//     //     map.addLayer({
//     //         id: 'route',
//     //         type: 'line',
//     //         source: {
//     //             type: 'geojson',
//     //             data: {
//     //                 type: 'Feature',
//     //                 properties: {},
//     //                 geometry: data
//     //             }
//     //         },
//     //         layout: {
//     //             'line-join': 'round',
//     //             'line-cap': 'round'
//     //         },
//     //         paint: {
//     //             'line-color': '#3887be',
//     //             'line-width': 8
//     //         }
//     //     });
//     // })
//     // .catch(error => {
//     //     console.error('Error getting directions:', error);
//     // });
// });