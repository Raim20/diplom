import { initMap } from "./init_map.js";

const map = initMap();

const trafficLayer = new google.maps.TrafficLayer();
trafficLayer.setMap(map);