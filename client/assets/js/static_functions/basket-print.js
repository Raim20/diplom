


const cart_products_list = document.querySelector('.catalog_page_1_list_1');
const cart = document.querySelector('.cart');
const cart_quantity = document.querySelector('.cart_quantity');
const full_price = document.querySelector('.basket_item_full_price');
let price = 0;

const normal_price = (str) => {
    return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

const price_without_spaces = (str) => {
    return str.replace(/\s/g, '');
};

const plus_full_price = (current_price) => {
    return price += current_price;
};

const minus_full_price = (current_price) => {
    if (price > 0) {
        return price -= current_price;
    } else {
        return price = 0;
    }

};

const print_full_price = () => {
    full_price.textContent = `${normal_price(price)} $`;
};

const generate_cart_product = (id, img, title, price) => {
    return `
    <div class="page_basket_item_style">
        <div class="basket_item_image">
            <img class="basket_item_image_style" src="${img}" alt="">
        </div>
            <div class="page_basket_item_info">
            <div class="basket_item_name">${title}</div>
        <div class="page_basket_item_info_style">
            <div class="basket_item_price">${normal_price(price)}</div>
            <div class="basket_button"><div data-id="${id}" class="basket_button_header">Remove</div></div>
        </div>
    </div>`;
};


for (const key in card) {
    document.querySelector('.page_basket_items').insertAdjacentHTML('afterbegin', generate_cart_product(card[key].id, card[key].img, card[key].name, card[key].price));
    let price_number = parseInt(price_without_spaces(document.querySelector('.basket_item_price').textContent));
    plus_full_price(price_number);
}
print_full_price();

const delete_products = (products_parent) => {
    let current_price = parseInt(price_without_spaces(products_parent.querySelector('.basket_item_price').textContent));
    minus_full_price(current_price);
    print_full_price();
    products_parent.remove();
};

document.addEventListener('click', (e) => {
    if (e.target.closest('.basket_button')) {
        console.log(e);
        delete_products(e.target.closest('.page_basket_item_style'));
    }
});