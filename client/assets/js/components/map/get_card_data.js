import { fetchCreateCurrenUserOrder } from "../taxi/create-current-user-order.js";

/* Обработка кликов на карточки попапа */

document.addEventListener('click', (e) => {
    const popup = document.getElementById('popup');
    if (e.target.closest('.popup_card_image') && popup.classList.contains('show')) {
        const data = e.target.closest('.popup_card_image');
        const parent = data.closest('.popup_card_style');
        const order_temp = {
            id_of_card: parent.getAttribute('data-id'),
            pickupLocation: pickupLocation,
            destination: destination,
            fare: parent.querySelector('.popup_card_price_style').textContent,
        };
        console.log(order_temp);
        fetchCreateCurrenUserOrder(order_temp);
    }
});