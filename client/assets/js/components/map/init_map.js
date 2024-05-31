export const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 43.235, lng: 76.9 },
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    zoomControl: true,
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
    gestureHandling: "greedy",
    styles: [
        {
          featureType: "poi",
          stylers: [{ visibility: "off" }]
        }
      ]
});

const trafficLayer = new google.maps.TrafficLayer();
trafficLayer.setMap(map);

// function initMap() {
//     const map = new google.maps.Map(document.getElementById('map'), {
//         center: { lat: 43.235, lng: 76.9 },
//         zoom: 12,
//         mapTypeId: google.maps.MapTypeId.ROADMAP,
//         disableDefaultUI: true,
//         zoomControl: true,
//         mapTypeControl: false,
//         fullscreenControl: false,
//         streetViewControl: false,
//         gestureHandling: "greedy"
//     });

//     return map;
// }

// export { initMap };


