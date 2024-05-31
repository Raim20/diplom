/*import { normal_price } from "../static_functions/get_price.js"
import items from "../../data/data_1.js"

const temp_items = items;

temp_items.sort(() => Math.random() - 0.5);

for (const key in temp_items) {
    items_print(temp_items[key]);
}*/


function createItemElement(item) {
    const itemContainer = document.createElement('div');
    itemContainer.classList.add('catalog_page_1_list_1_item_1');
    itemContainer.dataset.id = item.id_of_game;

    const itemImage = document.createElement('img');
    itemImage.classList.add('catalog_page_1_list_1_item_image');
    itemImage.src = item.img;
    itemImage.alt = '';
    itemContainer.appendChild(itemImage);

    const itemInfo = document.createElement('div');
    itemInfo.classList.add('catalog_page_1_list_1_item_info');
    itemContainer.appendChild(itemInfo);

    const itemName = document.createElement('div');
    itemName.classList.add('catalog_page_1_list_1_item_name', 'catalog_page_1_list_1_item_name_style');
    itemName.textContent = item.name;
    itemInfo.appendChild(itemName);

    const itemPrice = document.createElement('div');
    itemPrice.classList.add('catalog_page_1_list_1_item_price');
    itemInfo.appendChild(itemPrice);

    const itemPriceText = document.createElement('div');
    itemPriceText.classList.add('catalog_page_1_list_1_item_price_style');
    itemPriceText.textContent = item.price;
    itemPrice.appendChild(itemPriceText);

    const buyButton = document.createElement('button');
    buyButton.classList.add('button_basket');
    itemPrice.appendChild(buyButton);

    const buyButtonText = document.createElement('div');
    buyButtonText.setAttribute('store-button', '');
    buyButtonText.classList.add('');
    buyButtonText.textContent = 'buy now';
    buyButton.appendChild(buyButtonText);

    return itemContainer;
}

fetch('/api/store')
    .then(response => response.json())
    .then(data => {
        const storeItemsContainer = document.querySelector('.catalog_page_1_list_1');
        data.forEach(item => {
            const itemElement = createItemElement(item);
            storeItemsContainer.appendChild(itemElement);
        });
    })
    .catch(error => console.error(error));



/*
function items_print(items) {
    const item = `
    <div data-id="${items.id_of_game}" class="catalog_page_1_list_1_item_1">
        <img class="catalog_page_1_list_1_item_image" src="${items.img}" alt="">
        <div class="catalog_page_1_list_1_item_info">
            <div class="catalog_page_1_list_1_item_name catalog_page_1_list_1_item_name_style">${items.name}</div>
            <div class="catalog_page_1_list_1_item_price">
                <div class="catalog_page_1_list_1_item_price_style">${normal_price(items.price)}</div>
                <button class="button_basket"><div store-button="" class="">buy now</div></button>
            </div>
        </div>
    </div>`;
    return item
}


fetch('/store')
    .then(response => response.json())
    .then(data => {
        const storeItemsContainer = document.getElementsByClassName('catalog_page_1_list_1');
        data.forEach(item => {
            const itemElement = items_print(item);
            storeItemsContainer.appendChild(itemElement);
        });
    })
    .catch(error => console.error(error));
 */


