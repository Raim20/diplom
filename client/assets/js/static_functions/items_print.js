//const data = require("../components/store-get.js")
//import { fetchStoreData } from "../components/store-get.js";

//const temp_items = fetchStoreData();
console.log(temp_items.games)
//temp_items.sort(() => Math.random() - 0.5);
const items = temp_items.games

items_print(items)

function items_print(items) {
    for (let item in items) {
        const data_for_print = `
            <div data-id="${temp_items[item].id}" class="catalog_page_1_list_1_item_1">
            <img class="catalog_page_1_list_1_item_image" src="${temp_items[item].img}" alt="">
            <div class="catalog_page_1_list_1_item_info">
                <div class="catalog_page_1_list_1_item_name catalog_page_1_list_1_item_name_style">${temp_items[item].name}</div>
                <div class="catalog_page_1_list_1_item_price">
                    <div class="catalog_page_1_list_1_item_price_style">${normal_price(temp_items[item].price)}</div>
                        <button class="button_basket"><div store-button="" class="">buy now</div></button>
                    </div>
                </div>
            </div>`;
        document.querySelector('.catalog_page_1_list_1').innerHTML += data_for_print;
    }
}
