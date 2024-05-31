// import { showPopup, hidePopup } from "../static_functions/display_popup.js";
// import { fetchGetFareCurrentUserOrder } from "../static_functions/taxi/get-fare-current-user-order.js";
// import { fetchCreateCurrenUserOrder } from "./taxi/create-current-user-order.js";

// const map = new google.maps.Map(document.getElementById('map'), {
//     center: { lat: 43.235, lng: 76.9 },
//     zoom: 12,
//     mapTypeId: google.maps.MapTypeId.ROADMAP,
//     disableDefaultUI: true,
//     zoomControl: true,
//     mapTypeControl: false,
//     fullscreenControl: false,
//     streetViewControl: false,
//     gestureHandling: "greedy"
// });

// const startInput = document.getElementById("start-input");
// const endInput = document.getElementById("end-input");

// const startDeleteButton = document.getElementById("start-delete");
// const endDeleteButton = document.getElementById("end-delete");

// const startAutocomplete = new google.maps.places.Autocomplete(startInput);
// const endAutocomplete = new google.maps.places.Autocomplete(endInput);

// startAutocomplete.setFields(['formatted_address']);
// endAutocomplete.setFields(['formatted_address']);

// startAutocomplete.setOptions({ componentRestrictions: { country: 'kz' } });
// endAutocomplete.setOptions({ componentRestrictions: { country: 'kz' } });

// startAutocomplete.bindTo("bounds", map);
// endAutocomplete.bindTo("bounds", map);

// const trafficLayer = new google.maps.TrafficLayer();
// trafficLayer.setMap(map);

// // var markers = [];
// var startMarker;
// var endMarker;
// var routePath = null;
// var decodedPath;

// function displayRoute(routeCoordinates) {
//     if (routePath) {
//         routePath.setMap(null);
//     }

//     routePath = new google.maps.Polyline({
//         path: routeCoordinates,
//         geodesic: true,
//         strokeColor: '#3887be',
//         strokeOpacity: 0.75,
//         strokeWeight: 6
//     });
//     routePath.setMap(map);


//     // const routePath = new google.maps.Polyline({
//     //     path: routeCoordinates,
//     //     geodesic: true,
//     //     strokeColor: '#3887be',
//     //     strokeOpacity: 0.75,
//     //     strokeWeight: 6
//     // });
//     // routePath.setMap(map);

//     const bounds = new google.maps.LatLngBounds();
//     decodedPath.forEach(point => bounds.extend(point));
//     map.fitBounds(bounds);
// }

// function getRandomColor() {
//     var letters = '0123456789ABCDEF';
//     var color = '#';
//     for (var i = 0; i < 6; i++) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }

// // function createMarker(latLng) {
// //     // const place = autocomplete.getPlace();
// //     // if (!place.geometry) {
// //     //     return;
// //     // }

// //     // if (marker) {
// //     //     marker.setMap(null);
// //     // }

// //     var color = !startMarker ? '#a3c2c2' : '#0a4f6b';

// //     var marker = new google.maps.Marker({
// //         position: latLng,
// //         map: map,
// //         draggable: true,
// //         icon: {
// //             path: google.maps.SymbolPath.CIRCLE,
// //             fillColor: color,
// //             fillOpacity: 1,
// //             strokeWeight: 0,
// //             scale: 8
// //         }
// //     });

// //     // var marker = new google.maps.Marker({
// //     //     position: latLng,
// //     //     map: map,
// //     //     draggable: true,
// //     //     icon: {
// //     //         path: google.maps.SymbolPath.CIRCLE,
// //     //         fillColor: color,
// //     //         fillOpacity: 1,
// //     //         strokeWeight: 0,
// //     //         scale: 8
// //     //     }
// //     // });

// //     // markers.push(marker);

// //     // if (markers.length === 2) {
// //     //     var coordinates = markers.map(function(marker) {
// //     //         return marker.getPosition();
// //     //     });
// //     //     console.log(coordinates);
// //     // }

// //     if (startMarker && endMarker) {
// //         var coordinates = [startMarker.position, endMarker.position];
// //         console.log(coordinates);
// //     }

// //     google.maps.event.addListener(marker, 'dragend', function() {
// //         updateRoute(marker);
// //     });

// //     google.maps.event.addListener(marker, 'click', function() {
// //         deleteMarker(this);
// //     });

// //     map.panTo(marker.position);

// //     return marker;
// // }

// function createMarker(latLng) {
//     let marker = null;
//     if (!startMarker) {
//         marker = new google.maps.Marker({
//             position: latLng,
//             map: map,
//             draggable: true,
//             icon: {
//                 path: google.maps.SymbolPath.CIRCLE,
//                 fillColor: '#a3c2c2',
//                 fillOpacity: 1,
//                 strokeWeight: 0,
//                 scale: 8
//             }
//         });
        
//         // google.maps.event.addListener(marker, 'dragend', function() {
//         //     updateMarkerAddress(startMarker);
//         // });

//         google.maps.event.addListener(marker, 'dragend', function() {
//             getAddressFromLatLng(startMarker.getPosition(), "startMarker", updateInputValue);
//         });

//         // startMarker = marker;
//         // startInput.value = getAddressFromLatLng(startMarker.getPosition());
//     } else if (!endMarker) {
//         marker = new google.maps.Marker({
//             position: latLng,
//             map: map,
//             draggable: true,
//             icon: {
//                 path: google.maps.SymbolPath.CIRCLE,
//                 fillColor: '#0a4f6b',
//                 fillOpacity: 1,
//                 strokeWeight: 0,
//                 scale: 8
//             }
//         });

//         // google.maps.event.addListener(marker, 'dragend', function() {
//         //     updateMarkerAddress(endMarker);
//         // });

//         google.maps.event.addListener(marker, 'dragend', function() {
//             getAddressFromLatLng(endMarker.getPosition(), "endMarker", updateInputValue);
//         });

//         // endMarker = marker;
//         // endInput.value = getAddressFromLatLng(endMarker.getPosition());
//     }
//     return marker;
// }

// function updateRoute() {
//     if (startMarker && endMarker) {
//         // var coordinates = markers.map(marker => marker.getPosition());
//         fetchRouteData(startMarker, endMarker);
//         showPopup(); // Показать всплывающий интерфейс
//     } else {
//         hidePopup(); // Скрыть всплывающий интерфейс, если один из маркеров удален
//     }
// }

// function limitMarkers(newLatLng) {
//     // if (markers.length >= 2) {
//     //     console.warn('Максимальное количество маркеров: 2');
//     //     return;
//     // }

//     if (!startMarker) {
//         startMarker = createMarker(newLatLng);
//         getAddressFromLatLng(startMarker.getPosition(), "startMarker", updateInputValue);
//         map.panTo(startMarker.position);
//     } else if (!endMarker){
//         endMarker = createMarker(newLatLng);
//         getAddressFromLatLng(endMarker.getPosition(), "endMarker", updateInputValue);
//         map.panTo(endMarker.position);
//     } else {
//         console.warn('Максимальное количество маркеров: 2');
//     }

//     // createMarker(newLatLng);

//     if (startMarker && endMarker) {
//         updateRoute();
//     }
// }

// // function getAddressFromLatLng(latlng) {
// //     var geocoder = new google.maps.Geocoder();
// //     geocoder.geocode({ 'location': latlng }, function(results, status) {
// //         if (status === google.maps.GeocoderStatus.OK) {
// //             if (results[0]) {
// //                 console.log(results[0].formatted_address);
// //                 // Здесь вы можете использовать полученный адрес
// //             } else {
// //                 console.log('Адрес не найден');
// //             }
// //         } else {
// //             console.log('Ошибка геокодирования: ' + status);
// //         }
// //     });
// // }

// // google.maps.event.addListener(startMarker, 'dragend', function() {
// //     updateMarkerAddress(startMarker);
// // });

// // google.maps.event.addListener(endMarker, 'dragend', function() {
// //     updateMarkerAddress(endMarker);
// // });

// // function updateMarkerAddress(marker) {
// //     const latlng = marker.getPosition();
// //     getAddressFromLatLng(latlng, function(address) {
// //         if (marker === startMarker) {
// //             startInput.value = address;
// //         } else if (marker === endMarker) {
// //             endInput.value = address;
// //         }
// //     });
// // }

// // function getAddressFromLatLng(latlng, callback) {
// //     var geocoder = new google.maps.Geocoder();
// //     geocoder.geocode({ 'location': latlng }, function(results, status) {
// //         if (status === google.maps.GeocoderStatus.OK) {
// //             if (results[0]) {
// //                 const address = results[0].formatted_address;
// //                 console.log(address);
// //                 callback(address);
// //             } else {
// //                 console.log('Адрес не найден');
// //             }
// //         } else {
// //             console.log('Ошибка геокодирования: ' + status);
// //         }
// //     });
// // }

// // function getAddressFromLatLng(latlng, check) {
// //     var geocoder = new google.maps.Geocoder();
// //     let address = "";
// //     geocoder.geocode({ 'location': latlng }, function(results, status) {
// //         if (status === google.maps.GeocoderStatus.OK) {
// //             if (results[0]) {
// //                 address = results[0].formatted_address;
// //                 console.log(address);
// //             } else {
// //                 console.log('Адрес не найден');
// //             }
// //         } else {
// //             console.log('Ошибка геокодирования: ' + status);
// //         }
// //     });

// //     if (check === "startMarker") {
// //         startInput.value = address;
// //     } else if (check === "endMarker") {
// //         endInput.value = address;
// //     }
// //     // return address;
// // }

// function getAddressFromLatLng(latlng, check, callback) {
//     var geocoder = new google.maps.Geocoder();
//     let address = "";
//     geocoder.geocode({ 'location': latlng }, function(results, status) {
//         if (status === google.maps.GeocoderStatus.OK) {
//             if (results[0]) {
//                 address = results[0].formatted_address;
//                 console.log(address);
//             } else {
//                 console.log('Адрес не найден');
//             }
//         } else {
//             console.log('Ошибка геокодирования: ' + status);
//         }
//         if (callback) {
//             callback(address, check);
//         }
//     });
// }

// function updateInputValue(address, check) {
//     if (check === "startMarker") {
//         startInput.value = address;
//     } else if (check === "endMarker") {
//         endInput.value = address;
//     }
// }



// map.addListener('click', function(e) {
//     limitMarkers(e.latLng);
//     getAddressFromLatLng(e.latLng);
// });

// // startAutocomplete.addListener("place_changed", function() {
// //     const place = startAutocomplete.getPlace();
// //     if (!place.geometry) {
// //         return;
// //     }

// //     if (startMarker) {
// //         startMarker.setMap(null);
// //     }

// //     startMarker = new google.maps.Marker({
// //         map: map,
// //         position: place.geometry.location
// //     });
// //     map.panTo(place.geometry.location);
// // });

// function handlePlaceChanged(autocomplete, marker) {
//     const place = autocomplete.getPlace();
//     if (!place.geometry) {
//         return;
//     }

//     if (marker) {
//         marker.setMap(null);
//     }

//     createMarker(place.geometry.location);
//     if (startMarker && endMarker) {
//         updateRoute();
//     }
// }


// startAutocomplete.addListener("place_changed", function() {
//     // const place = startAutocomplete.getPlace();
//     // if (!place.geometry) {
//     //     return;
//     // }

//     // if (startMarker) {
//     //     startMarker.setMap(null);
//     // }

//     handlePlaceChanged(startAutocomplete, startMarker);
// });

// endAutocomplete.addListener("place_changed", function() {
//     handlePlaceChanged(endAutocomplete, endMarker);
// });

// function deleteAllMarkers(marker) {
//     marker.setMap(null);
//     markers = markers.filter(m => m !== marker);
//     if (markers.length === 2) {
//         updateRoute();
//     }
// }

// function deleteMarker(marker) {
//     if (marker === startMarker) {
//         startMarker.setMap(null);
//         startMarker = null;
//         startInput.value = "";
//         map.panTo(endMarker.getPosition());
//     } else {
//         endMarker.setMap(null);
//         endMarker = null;
//         endInput.value = "";
//         map.panTo(startMarker.position);
//     }

//     if (routePath) {
//         routePath.setMap(null);
//     }

//     // if (startMarker) {
//     //     map.panTo(startMarker.getPosition());
//     // } else {
//     //     map.panTo(endMarker.position);
//     // }
// }

// startDeleteButton.addEventListener("click", function() {
//     deleteMarker(startMarker);
// });

// endDeleteButton.addEventListener("click", function() {
//     deleteMarker(endMarker);
// });




// // function limitMarkers(newLngLat) {
// //     if (markers.length >= 2) {
// //         console.warn('Максимальное количество маркеров: 2');
// //         return;
// //     }

// //     createMarker(newLngLat);

// //     if (markers.length === 2) {
// //         updateRoute();
// //     }
// // }

// // map.addListener('click', function(e) {
// //     limitMarkers(e.latLng);
// // });

// // const pickupLocation = {
// //     coordinates: []
// // };
// // const destination = {
// //     coordinates: []
// // };

// let pickupLocation = {
//     coordinates: []
// };
// let destination = {
//     coordinates: []
// };


// async function fetchRouteData(startMarker, endMarker) {
//     try {
//         if (!startMarker || !endMarker) {
//             console.error('Ошибка: Не удалось получить координаты маршрута');
//             return;
//         }

//         const requestOptions = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ start: startMarker.position, end: endMarker.position })
//         };

//         const apiUrl = "http://localhost:5000/api/map";

//         const response = await fetch(apiUrl, requestOptions);
//         const data = await response.json();

//         if (response.ok) {
//             console.log(data.map_data);
//             decodedPath = data.map_data.map(point => ({ lat: point.lat, lng: point.lng }));

//             // fetchGetFareCurrentUserOrder();

//             // pickupLocation = startMarker.position;
//             // destination = endMarker.position;

//             // const pickupLocation = {
//             //     coordinates: [startMarker.getPosition().lat, startMarker.getPosition().lng]
//             // };
//             // const destination = {
//             //     coordinates: [endMarker.getPosition().lat, endMarker.getPosition().lng]
//             // };

//             pickupLocation = {
//                 coordinates: [startMarker.position.lat(), startMarker.position.lng()]
//             };
//             destination = {
//                 coordinates: [endMarker.position.lat(), endMarker.position.lng()]
//             };

//             fetchGetFareCurrentUserOrder(pickupLocation, destination);

//             displayRoute(data.map_data);
//         } else {
//             console.error(data.message);
//         }
//     } catch (error) {
//         console.error('Ошибка:', error);
//     }
// }

// function searchLocation() {
//     const location = document.getElementById("location-input").value;
//     const messageElement = document.getElementById("message");
//     messageElement.style.display = "none";

//     if (!location) {
//         showMessage("Введите название местности", "error");
//         return;
//     }

//     geocoder.geocode({ address: location }, function(results, status) {
//         if (status === google.maps.GeocoderStatus.OK) {
//             const location = results[0].geometry.location;
//             map.setCenter(location);
//             addMarker(location);
//             showMessage("Местность найдена", "success");
//         } else {
//             showMessage("Местность не найдена", "error");
//         }
//     });
// }

// function showMessage(message, type) {
//     const messageElement = document.getElementById("message");
//     messageElement.textContent = message;
//     messageElement.className = type;
//     messageElement.style.display = "block";
// }

// // function geocodeAddress() {
// //     const geocoder = new google.maps.Geocoder();
// //     const address = document.getElementById('locationInput').value;

// //     geocoder.geocode({ 'address': address }, function(results, status) {
// //         if (status === 'OK') {
// //             const location = results[0].geometry.location;
// //             limitMarkers(location);
// //         } else {
// //             console.error('Геокодирование не удалось по следующей причине: ' + status);
// //         }
// //     });
// // }


// let order_temp = {}

// function get_item_data(data) {
//     let parent = data.closest('.popup_card_style');
//     order_temp = {
//         id_of_card: parent.getAttribute('data-id'),
//         pickupLocation: pickupLocation,
//         destination: destination,
//         fare: parent.querySelector('.popup_card_price_style').textContent,
//     }
//     console.log(order_temp);
// }

// document.addEventListener('click', (e) => {
//     const popup = document.getElementById('popup');
//     if (e.target.closest('.popup_card_image') && popup.classList.contains('show')) {
//         console.log(e);
//         get_item_data(e.target.closest('.popup_card_image'));
//         fetchCreateCurrenUserOrder(order_temp);
//     }
// });

// // document.addEventListener('click', (e) => {
// //     const popup = document.getElementById('popup');
// //     if (e.target.closest('.popup_card_image') && popup.classList.contains('show')) {
// //         e.
// //         console.log(e);
// //         get_item_data(e.target.closest('.popup_card_image'));
// //         fetchCreateCurrenUserOrder(order_temp);
// //     }
// // });



// export { map as temp_map };
// // export const temp_map = map;
// // export const pickupLocation = startMarker.position;
// // export const destination = endMarker.position;


