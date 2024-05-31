import { fare } from "./get-fare-current-user-order_final.js";

function updateFareValues(fareData) {
    const fareElements = document.querySelectorAll('.popup_card_style');

    fareElements.forEach(element => {
        const id = element.getAttribute('data-id');
        const fareValueElement = element.querySelector('.popup_card_price_style');

        if (fareData[id] !== undefined) {
            fareValueElement.textContent = fareData[id];
        } else {
            console.warn(`Fare data for ${id} not found`);
        }
    });
}


export { updateFareValues };