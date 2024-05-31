async function fetchAddOrder() {
    const token = localStorage.getItem('token')

    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            body: JSON.stringify({ id_of_game: card_temp.id_of_game, img: card_temp.img, name: card_temp.name, price: card_temp.price })
        };

        const apiUrl = "http://localhost:5000/api/store";

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data.message);
            console.log(data.order);
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

let card_temp = {}

function get_item_data(data) {
    let parent = data.closest('.catalog_page_1_list_1_item_1');
    card_temp = {
        id_of_game: parent.getAttribute('data-id'),
        img: parent.querySelector('.catalog_page_1_list_1_item_image').getAttribute('src'),
        name: parent.querySelector('.catalog_page_1_list_1_item_name').textContent,
        price: parent.querySelector('.catalog_page_1_list_1_item_price_style').textContent
    }
    console.log(card_temp);
}

document.addEventListener('click', (e) => {
    if (e.target.closest('.button_basket_event_2')) {
        console.log(e);
        get_item_data(e.target.closest('.button_basket_event_2'));
        fetchAddOrder()
    }
});

export default card_temp