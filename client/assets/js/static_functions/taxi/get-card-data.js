let order_temp = {}

function get_item_data(data) {
    order_temp = {
        id_of_card: data.id,
        pickupLocation: pickupLocation,
        destination: destination,
        fare: data.querySelector('.popup_card_style').textContent,
    }
    console.log(order_temp);
}

document.addEventListener('click', (e) => {
    if (e.target.closest('.popup_card_style')) {
        console.log(e);
        get_item_data(e.target.closest('.popup_card_style'));
        // fetchCreateCurrenUserOrder(order_temp);
    }
});