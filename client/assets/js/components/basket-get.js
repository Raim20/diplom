//import card_temp from "../static_functions/add_order.js";
//import { normal_price, price_without_spaces } from "./basket-delete.js";

import { files } from "../static_functions/default.js";

let price = 0
const full_price = document.querySelector('.basket_item_full_price');

const normal_price = (str) => {
    return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};
const price_without_spaces = (str) => {
    return str.replace(/\s/g, '');
};
const minus_full_price = (current_price) => {
    if (price > 0) {
        return price -= current_price;
    } else {
        return price = 0;
    }

};
const print_full_price = () => {
    full_price.textContent = `${price} $`;
};

async function fetchGetOrders() {
    const token = localStorage.getItem('token')

    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: token
            },
        };

        const apiUrl = "http://localhost:5000/api/basket";

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data.order_items);
            const items = data.order_items
            console.log(items)
            for (const item in items) {
                const game_img = files.server_api_url + "/" + items[item].id_of_game.replace('#', '') + "/" + items[item].img;
                const data_for_print = `
            <div data-id="${items[item].id_of_game}" class="page_basket_item_style">
                <div class="basket_item_image">
                  <img class="basket_item_image_style" src="${game_img}" alt="">
                </div>
                <div class="page_basket_item_info">
                  <div class="basket_item_name">${items[item].name}</div>
                  <div class="page_basket_item_info_style">
                    <div class="basket_item_price">${items[item].price}</div>
                    <div class="basket_button"><div class="basket_button_header">Remove</div></div>
                  </div>
                </div>
            </div>`;
                document.querySelector('.page_basket_items').innerHTML += data_for_print;
                price += parseInt(price_without_spaces(items[item].price))
            }
            print_full_price()
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

fetchGetOrders()

async function fetchBasketDelete(id_of_game, token) {
    try {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
        };

        const apiUrl = `http://localhost:5000/api/basket/${id_of_game}`;

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data);
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

const delete_products = (products_parent) => {
    let parent = products_parent.closest('.page_basket_item_style')
    let current_price = parseInt(price_without_spaces(parent.querySelector('.basket_item_price').textContent));
    const id_of_game = parent.getAttribute('data-id').replace('#', '');
    const token = localStorage.getItem('token')
    console.log(id_of_game)
    minus_full_price(current_price);
    fetchBasketDelete(id_of_game, token)
};

document.addEventListener('click', async (e) => {
    if (e.target.closest('.basket_button_header')) {
        console.log(e);
        await delete_products(e.target.closest('.basket_button_header'));
    }
});