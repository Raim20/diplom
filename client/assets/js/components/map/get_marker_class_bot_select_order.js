import { map } from "./init_map.js";


class BotMarkerFunction {
    constructor(map) {
        this.map = map;
        this.markers = [];
        this.user = [];
        this.driver = [];
        // this.initial_area = {
        //     latMin: 40,
        //     latMax: 41,
        //     lngMin: -74,
        //     lngMax: -73
        // };
        this.icon_options = {
            econom: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: '#a3c2c2',
                fillOpacity: 1,
                strokeWeight: 0,
                scale: 8
            },
            comfort: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: '#0a4f6b',
                fillOpacity: 1,
                strokeWeight: 0,
                scale: 8
            },
            business: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: '#ff0000',
                fillOpacity: 1,
                strokeWeight: 0,
                scale: 8
            }
        };
        this.directionsService = new google.maps.DirectionsService();
        this.speedRange = { min: 0.5, max: 5 };
        this.intervals = [];
    }
    
    create_marker(position, type) {
        const marker = new google.maps.Marker({
            position: position,
            map: this.map,
            draggable: false,
            icon: this.icon_options[type]
        });

        return marker;
    }

    delete_all_markers() {
        this.markers.forEach(marker => marker.marker.setMap(null));
        this.markers = [];
    }

    generateRandomLatLng(area) {
        const lat = Math.random() * (area.latMax - area.latMin) + area.latMin;
        const lng = Math.random() * (area.lngMax - area.lngMin) + area.lngMin;
        return { lat, lng };
    }

    generateRandomName() {
        const names = ['John', 'Alice', 'Bob', 'Emma', 'Michael'];
        return names[Math.floor(Math.random() * names.length)];
    }

    generateRandomId(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomId = '';
    
        for (let i = 0; i < length; i++) {
            randomId += characters.charAt(Math.floor(Math.random() * characters.length));
        }
    
        return randomId;
    }

    distributeCategories(numBots) {
        const categories = ['econom', 'comfort', 'business'];
        const distribution = { econom: 0, comfort: 0, business: 0 };

        for (let i = 0; i < numBots; i++) {
            const category = categories[Math.floor(Math.random() * categories.length)];
            distribution[category]++;
        }

        return distribution;
    }

    create_bots(numBots, area, userBots) {
        this.delete_all_markers();

        const distribution = this.distributeCategories(numBots);
        
        for (const [category, count] of Object.entries(distribution)) {
            for (let i = 0; i < count; i++) {
                const position = this.generateRandomLatLng(area);
                const marker = this.create_marker(position, category);
                this.markers.push({ marker: marker, latlng: position, category: category, id: this.generateRandomId(8), name: this.generateRandomName() });
                // this.user.push({ latlng: this.generateRandomLatLng(area), userId: this.generateRandomId(8), userName: this.generateRandomName() });
                this.driver.push({ latlng: position, category: category, driverId: this.generateRandomId(8), driverName: this.generateRandomName() });
                // this.get_route_and_move_bot(marker, area);
            }
        }

        for (let i = 0; i < userBots; i++) {
            this.user.push({ latlng: this.generateRandomLatLng(area), userId: this.generateRandomId(8), userName: this.generateRandomName() });
        }

        this.markers.forEach(markerData => {
            this.get_route_and_move_bot(markerData.marker, area);
        });
    }


    get_route_and_move_bot(marker, area) {
        const destination = this.generateRandomLatLng(area);

        const request = {
            origin: marker.getPosition(),
            destination: destination,
            travelMode: 'DRIVING'
        };

        this.directionsService.route(request, (result, status) => {
            if (status === 'OK') {
                this.move_bot_along_route(marker, result.routes[0].overview_path, area);
            } else {
                console.error('Directions request failed due to ' + status);
            }
        });
    }

    move_bot_along_route(marker, route, area) {
        let step = 0;
        let speed = Math.random() * (this.speedRange.max - this.speedRange.min) + this.speedRange.min;
    
        const move = () => {
            if (step < route.length - 1) {
                const currentSegmentStart = route[step];
                const currentSegmentEnd = route[step + 1];
                const distance = google.maps.geometry.spherical.computeDistanceBetween(currentSegmentStart, currentSegmentEnd);
                const duration = distance / speed * 1000;

                let progress = 0;
                const moveStep = () => {
                    progress += speed / distance;
                    const newPosition = google.maps.geometry.spherical.interpolate(currentSegmentStart, currentSegmentEnd, progress);
                    marker.setPosition(newPosition);
    
                    if (progress < 1) {
                        this.intervals.push(setTimeout(moveStep, 1000));
                        // setTimeout(moveStep, 1000); // Повторяем шаг через 1 секунду
                    } else {
                        step++;
                        move();
                    }
                };
    
                moveStep();
            } else {
                // Маршрут завершен, сгенерировать новый маршрут
                this.get_route_and_move_bot(marker, area);
            }
        };
    
        move();
    }

    async assignOrderToRandomDriver() {
        const randomDriver = this.markers[Math.floor(Math.random() * this.markers.length)];
        this.stopAndClearAllBots();
        return randomDriver;
    }

    stopAndClearAllBots() {
        this.intervals.forEach(interval => clearTimeout(interval));
        this.intervals = [];

        this.delete_all_markers();
    }
}

const Bot = new BotMarkerFunction(map);

export { Bot };