// function showLocationOnMap(location) {
//     if (userMarker) {
//         userMarker.setPosition(location);
//     } else {
//         userMarker = new google.maps.Marker({
//             position: location,
//             map: map,
//             title: "Your Location",
//             icon: {
//                 path: google.maps.SymbolPath.CIRCLE,
//                 fillColor: '#FF0000',
//                 fillOpacity: 1,
//                 strokeWeight: 0,
//                 scale: 8
//             }
//         });
//     }
//     map.setCenter(location);
// }

import { showLocationOnMap } from "./validate_user_current_location.js";


function handleLocationError(browserHasGeolocation, pos) {
    const infoWindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: browserHasGeolocation
            ? 'Error: The Geolocation service failed.'
            : "Error: Your browser doesn't support geolocation."
    });
    map.setCenter(pos);
}

function getCurrentPosition(check) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userPos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                
                showLocationOnMap(userPos, check);                
            },
            () => {
                handleLocationError(true, map.getCenter());
            }
        );
    } else {
        handleLocationError(false, map.getCenter());
    }
}


export { getCurrentPosition };

// document.getElementById('locate-btn').addEventListener('click', () => {
//     getCurrentPosition();
// });

// map.setCenter(userPos);

//                 if (userMarker) {
//                     userMarker.setPosition(userPos);
//                 } else {
//                     userMarker = new google.maps.Marker({
//                         position: userPos,
//                         map: map,
//                         title: "Your Location",
//                         icon: {
//                             path: google.maps.SymbolPath.CIRCLE,
//                             fillColor: '#FF0000',
//                             fillOpacity: 1,
//                             strokeWeight: 0,
//                             scale: 8
//                         }
//                     });
//                 }