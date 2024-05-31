const full_price = document.querySelector('.basket_item_full_price');
import get_price from "./basket-get.js"
let price = get_price
export const normal_price = (str) => {
    return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};
export const price_without_spaces = (str) => {
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

async function fetchBasketDelete(id_of_fame, token) {
    try {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
        };

        const apiUrl = `http://localhost:5000/api/basket/${id_of_fame}`;

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
    const id_of_game = parent.getAttribute('data-id')
    const token = localStorage.getItem('token')
    console.log(id_of_game)
    fetchBasketDelete(id_of_game, token)
    minus_full_price(current_price);
    print_full_price();
};

document.addEventListener('click', (e) => {
    if (e.target.closest('.basket_button')) {
        console.log(e);
        delete_products(e.target.closest('.basket_button'));
    }
});












/*
export const normal_price = (str) => {
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

async function fetchBasketDelete(id_of_fame) {
    const token = localStorage.getItem('token')

    try {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                Authorization: token
            },
        };

        const apiUrl = `http://localhost:5000/api/basket/${id_of_fame}`;

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
    let current_price = parseInt(price_without_spaces(products_parent.querySelector('.basket_item_price').textContent));
    const id_of_game = products_parent.getAttribute('data-id')
    minus_full_price(current_price);
    print_full_price();
    fetchBasketDelete(id_of_game)
};

document.addEventListener('click', (e) => {
    if (e.target.closest('.basket_button')) {
        console.log(e);
        delete_products(e.target.closest('.page_basket_item_style'));
    }
});

*/