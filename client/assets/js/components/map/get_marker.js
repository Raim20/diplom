let start_marker = null;
let end_marker = null;

function get_start_marker() {
    return start_marker;
}

function get_end_marker() {
    return start_marker;
}

function set_start_marker(position) {
    start_marker = new google.maps.Marker({
        position: position,
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
}

function set_end_marker(position) {
    end_marker = new google.maps.Marker({
        position: position,
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
}

// function () {}
// function () {}
// function () {}
// function () {}


export { get_start_marker, set_start_marker, get_end_marker, set_end_marker };