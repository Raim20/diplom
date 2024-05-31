import { map } from "./init_map.js";
import { getAddressFromLatLng, updateInputValue } from "./get_address_from_latlng.js";
import { fetchRouteData } from "./get_path_route_final.js";
import { fetchGetFareCurrentUserOrder } from "./get-fare-current-user-order_final.js";
import { showPopup, hidePopup } from "../../static_functions/display_popup.js";
import { startInput, endInput } from "./autocomplete_input.js";


class MarkerFunction {
    constructor(map) {
        this.map = map;
        this.directionsService = new google.maps.DirectionsService();
        this.directionsRenderer = new google.maps.DirectionsRenderer();
        this.directionsRenderer.setMap(map);
        this.start_marker = null;
        this.end_marker = null;
        this.route_path = null;
        this.trafficFactor = null;
        this.icon_options = {
            startMarker: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: '#a3c2c2',
                fillOpacity: 1,
                strokeWeight: 0,
                scale: 8
            },
            endMarker: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: '#0a4f6b',
                fillOpacity: 1,
                strokeWeight: 0,
                scale: 8
            }
        };
    }
    
    create_marker(position, type) {
        const marker = new google.maps.Marker({
            position: position,
            map: this.map,
            draggable: true,
            icon: this.icon_options[type]
        });

        google.maps.event.addListener(marker, 'dragend', () => {
            getAddressFromLatLng(marker.getPosition(), type, updateInputValue);
        });

        return marker;
    }

    delete_marker(type) {
        if (type === "startMarker") {
            this.start_marker.setMap(null);
            this.start_marker = null;
            startInput.value = "";
            if (this.end_marker) {
                this.map.panTo(this.end_marker.getPosition());
            }
        } else if (type === "endMarker") {
            this.end_marker.setMap(null);
            this.end_marker = null;
            endInput.value = "";
            if (this.start_marker) {
                this.map.panTo(this.start_marker.getPosition());
            }
        }
    }

    delete_marker_and_clear_route_path(type) {
        this.delete_marker(type);

        if (this.route_path) {
            this.clear_route_path();
        }
    }

    clear_route_path() {
        if (this.route_path) {
            this.route_path.setMap(null);
            this.route_path = null;
        }
    }

    display_route(route_coordinates) {
        if (!Array.isArray(route_coordinates)) {
            console.error("Route coordinates should be an array");
            return;
        }

        if (this.route_path) {
            this.clear_route_path();
        }
    
        this.route_path = new google.maps.Polyline({
            path: route_coordinates,
            geodesic: true,
            strokeColor: '#3887be',
            strokeOpacity: 0.75,
            strokeWeight: 6
        });

        this.route_path.setMap(this.map);
        
        const bounds = new google.maps.LatLngBounds();
        route_coordinates.forEach(point => bounds.extend(point));
        this.map.fitBounds(bounds);
    
        const pickupLocation = {
            coordinates: [this.start_marker.getPosition().lat(), this.start_marker.getPosition().lng()]
        };
        const destination = {
            coordinates: [this.end_marker.getPosition().lat(), this.end_marker.getPosition().lng()]
        };
    
        // fetchGetFareCurrentUserOrder(pickupLocation, destination);
    }

    get_start_marker() {
        return this.start_marker;
    }
    
    set_start_marker(position) {
        if (this.start_marker) {
            this.delete_marker("startMarker");
        }

        this.start_marker = this.create_marker(position, "startMarker");
        getAddressFromLatLng(this.start_marker.getPosition(), "startMarker", updateInputValue);
        this.map.panTo(this.start_marker.position);
        // this.updateRoute();
    }

    get_end_marker() {
        return this.end_marker;
    }

    set_end_marker(position) {
        if (this.end_marker) {
            this.delete_marker("endMarker");
        }

        this.end_marker = this.create_marker(position, "endMarker");
        getAddressFromLatLng(this.end_marker.getPosition(), "endMarker", updateInputValue);
        this.map.panTo(this.end_marker.position);
        // this.updateRoute();
    }

    async getWeatherData(lat, lng) {
        const apiKey = '4e73c345d32b5920d59c0985f0cc795e';
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        const rainCoefficient = data.rain ? data.rain["1h"] || 0 : 0;
        console.log(`Weather at (${lat}, ${lng}):`, data);
        console.log(`Rain coefficient: ${rainCoefficient}`);
        return rainCoefficient;
    }

    updateRoute() {
        if (this.start_marker && this.end_marker) {
            fetchRouteData(this.start_marker.position, this.end_marker.position).then(route => {
                this.display_route(route);
                // showPopup();
            }).catch(error => {
                console.error("Error fetching route data:", error);
                hidePopup();
            });

            this.getWeatherData(this.start_marker.getPosition().lat(), this.start_marker.getPosition().lng());

            // const request = {
            //     origin: this.start_marker.getPosition(),
            //     destination: this.end_marker.getPosition(),
            //     travelMode: 'DRIVING',
            //     drivingOptions: {
            //         departureTime: new Date(Date.now() + 1000 * 60),
            //         trafficModel: 'pessimistic'
            //     }
            // };
    
            // this.directionsService.route(request, (result, status) => {
            //     if (status === 'OK') {
            //         this.directionsRenderer.setDirections(result);
            //         this.calculateTrafficFactor(result);
            //     } else {
            //         console.error('Directions request failed due to ' + status);
            //     }
            // });
            
            // const route = fetchRouteData(this.start_marker.position, this.end_marker.position)
            // this.display_route(route);
            // showPopup();
        } else {
            hidePopup();
        }
    }

    calculateTrafficFactor(result) {
        if (!result || !result.routes || !result.routes.length) return;
        
        const legs = result.routes[0].legs;
        let trafficFactor = 0;
        let totalDurationInTraffic = 0;
        let totalDuration = 0;

        legs.forEach(leg => {
            totalDurationInTraffic += leg.duration_in_traffic.value;
            totalDuration += leg.duration.value;
        });

        if (totalDuration > 0) {
            trafficFactor = totalDurationInTraffic / totalDuration;
        }

        this.trafficFactor = trafficFactor;
        console.log('Traffic Factor:', trafficFactor);
    }

    set_start_marker_position(position) {
        if (this.start_marker) {
            this.start_marker.position = position;
        } else {
            console.error("Start marker is not defined.");
        }        
    }

    set_end_marker_position(position) {
        if (this.end_marker) {
            this.end_marker.position = position;
        } else {
            console.error("End marker is not defined.");
        }
    }
}

const Marker = new MarkerFunction(map);

export { Marker };