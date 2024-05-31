import { map } from "./init_map.js";
import { fetchGetDriversData } from "./get_drivers_data.js";

async function updateDriversLocationOnMap() {
    const driversData = await fetchGetDriversData();
    if (!driversData) {
        return;
    }

    driversData.forEach(async (driver) => {
        const driverPosition = { lat: driver.latitude, lng: driver.longitude };
        const driverMarker = driversMarkersMap.get(driver.id);

        if (driverMarker) {
            driverMarker.setPosition(driverPosition);
        } else {
            const newDriverMarker = new google.maps.Marker({
                position: driverPosition,
                map: map,
                title: driver.name
            });
            driversMarkersMap.set(driver.id, newDriverMarker);
        }
    });
}

const updateInterval = setInterval(updateDriversLocationOnMap, 1000);

// Остановить обновление местоположения водителей (например, при закрытии страницы)
// clearInterval(updateInterval);
