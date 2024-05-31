import { map } from "./init_map.js";
import { startMarker, endMarker } from "./create_marker.js";
import { createMarker } from "./create_marker.js";
// import { deleteMarker } from "./delete_marker.js";
import { getCurrentPosition } from "./get_current_position.js";
import { getAddressFromLatLng, updateInputValue } from "./get_address_from_latlng.js";

// var startMarker1 = startMarker;
// var endMarker1 = endMarker;

const getLocationButtons = document.querySelectorAll('.get_location');
// const startInput = document.getElementById('start-input');
// const endInput = document.getElementById('end-input');

getLocationButtons.forEach(button => {
    button.addEventListener('click', function() {
        const check = button.id.includes('start') ? 'startMarker' : 'endMarker';
        getCurrentPosition(check);
    });
});

function deleteMarker(marker) {
    marker.setMap(null);
}

function showLocationOnMap(userPos, check) {
    // const marker = new google.maps.Marker({
    //     position: userPos,
    //     map: map,
    // });
    console.log(userPos);
    // if (check === "startMarker") {
    //     startMarker1 = createMarker(userPos);
    //     console.log(startMarker1);
    //     map.panTo(startMarker1.position);
    //     // startMarker = new google.maps.Marker({
    //     //     position: userPos,
    //     //     map: map,
    //     //     draggable: true,
    //     //     icon: {
    //     //         path: google.maps.SymbolPath.CIRCLE,
    //     //         fillColor: '#a3c2c2',
    //     //         fillOpacity: 1,
    //     //         strokeWeight: 0,
    //     //         scale: 8
    //     //     }
    //     // });
    // } else if (check === "endMarker") {
    //     endMarker1 = createMarker(userPos);
    //     console.log(endMarker1);
    //     map.panTo(endMarker1.position);
    //     // endMarker = new google.maps.Marker({
    //     //     position: userPos,
    //     //     map: map,
    //     //     draggable: true,
    //     //     icon: {
    //     //         path: google.maps.SymbolPath.CIRCLE,
    //     //         fillColor: '#a3c2c2',
    //     //         fillOpacity: 1,
    //     //         strokeWeight: 0,
    //     //         scale: 8
    //     //     }
    //     // });
    // }

    if (check === "startMarker") {
        if (startMarker) {
            deleteMarker(startMarker);
        }
        startMarker = createMarker(userPos);
    } else if (check === "endMarker") {
        if (endMarker) {
            deleteMarker(endMarker);
        }
        endMarker = createMarker(userPos);
    }


    getAddressFromLatLng(userPos, check, (address, check) => {
        updateInputValue(address, check);
    });
}


export { showLocationOnMap };