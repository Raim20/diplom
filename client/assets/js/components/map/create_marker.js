import { map } from "./init_map.js";
import { getAddressFromLatLng, updateInputValue } from "./get_address_from_latlng.js";
import { showPopup, hidePopup } from "../../static_functions/display_popup.js";
import { fetchRouteData } from "./get_path_route.js";
import { deleteMarker } from "./delete_marker.js";

// const startDeleteButton = document.getElementById("start-delete");
// const endDeleteButton = document.getElementById("end-delete");

export let startMarker = null;
export let endMarker = null;

/* Функция создания маркера */

export function createMarker(latLng) {
    let marker = null;
    if (!startMarker) {
        marker = new google.maps.Marker({
            position: latLng,
            map: map,
            draggable: true,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: '#a3c2c2',
                fillOpacity: 1,
                strokeWeight: 0,
                scale: 8
            }
        });

        google.maps.event.addListener(marker, 'dragend', function() {
            getAddressFromLatLng(startMarker.getPosition(), "startMarker", updateInputValue);
        });
    } else if (!endMarker) {
        marker = new google.maps.Marker({
            position: latLng,
            map: map,
            draggable: true,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: '#0a4f6b',
                fillOpacity: 1,
                strokeWeight: 0,
                scale: 8
            }
        });

        google.maps.event.addListener(marker, 'dragend', function() {
            getAddressFromLatLng(endMarker.getPosition(), "endMarker", updateInputValue);
        });
    }
    return marker;
}


// export function createMarker(latLng) {
//     let marker = new google.maps.Marker({
//         position: latLng,
//         map: map,
//         draggable: true,
//         icon: {
//             path: google.maps.SymbolPath.CIRCLE,
//             fillColor: '#0a4f6b',
//             fillOpacity: 1,
//             strokeWeight: 0,
//             scale: 8,
//         },
//     });

//     google.maps.event.addListener(marker, 'dragend', function() {
//         if (marker === startMarker) {
//             getAddressFromLatLng(startMarker.getPosition(), "startMarker", updateInputValue);
//         } else if (marker === endMarker) {
//             getAddressFromLatLng(endMarker.getPosition(), "endMarker", updateInputValue);
//         } else {
//             console.warn('Не верный маркер');
//         }

//         updateRoute();
//     });


//     return marker;
// }


function updateRoute() {
    if (startMarker && endMarker) {
        fetchRouteData(startMarker, endMarker);
        showPopup(); // Показать всплывающий интерфейс
    } else {
        hidePopup(); // Скрыть всплывающий интерфейс, если один из маркеров удален
    }
}

/* Функция для ограничения количества маркеров */

function limitMarkers(newLatLng) {
    if (!startMarker) {
        startMarker = createMarker(newLatLng);
        getAddressFromLatLng(startMarker.getPosition(), "startMarker", updateInputValue);
        map.panTo(startMarker.position);
    } else if (!endMarker){
        endMarker = createMarker(newLatLng);
        getAddressFromLatLng(endMarker.getPosition(), "endMarker", updateInputValue);
        map.panTo(endMarker.position);
    } else {
        console.warn('Максимальное количество маркеров: 2');
    }

    if (startMarker && endMarker) {
        updateRoute();
    }
}

/* Ограничение маркеров на карте */

// map.addListener('click', function(e) {
//     limitMarkers(e.latLng);
//     // getAddressFromLatLng(e.latLng);
// });

// startDeleteButton.addEventListener("click", function() {
//     deleteMarker(startMarker);
// });

// endDeleteButton.addEventListener("click", function() {
//     deleteMarker(endMarker);
// });

export { updateRoute, limitMarkers };


// import { initMap } from "./init_map.js";
// import { getAddressFromLatLng } from "./get_address_from_latlng.js";
// import { startInput, endInput } from "./autocomplete_input.js";
// import { showPopup, hidePopup } from "../../static_functions/display_popup.js";
// import { fetchRouteData } from "./get_path_route.js";

// const map = initMap();

// var startMarker = null;
// var endMarker = null;

// /* Функция создания маркера */

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

//         google.maps.event.addListener(marker, 'dragend', function() {
//             getAddressFromLatLng(startMarker.getPosition(), "startMarker", updateInputValue);
//         });
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

//         google.maps.event.addListener(marker, 'dragend', function() {
//             getAddressFromLatLng(endMarker.getPosition(), "endMarker", updateInputValue);
//         });
//     }
//     return marker;
// }

// function updateRoute() {
//     if (startMarker && endMarker) {
//         fetchRouteData(startMarker, endMarker);
//         showPopup(); // Показать всплывающий интерфейс
//     } else {
//         hidePopup(); // Скрыть всплывающий интерфейс, если один из маркеров удален
//     }
// }

// function updateInputValue(address, check) {
//     if (check === "startMarker") {
//         startInput.value = address;
//     } else if (check === "endMarker") {
//         endInput.value = address;
//     }
// }

// /* Функция для ограничения количества маркеров */

// function limitMarkers(newLatLng) {
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

//     if (startMarker && endMarker) {
//         updateRoute();
//     }
// }

// /* Ограничение маркеров на карте */

// map.addListener('click', function(e) {
//     limitMarkers(e.latLng);
//     getAddressFromLatLng(e.latLng);
// });


// export { startMarker, endMarker, updateRoute };