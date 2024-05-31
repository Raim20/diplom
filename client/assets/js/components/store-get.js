//const token = require("../static_functions/save_token.js")
import { files } from "../static_functions/default.js";
import { check_purchase } from "../static_functions/check_purchase.js";
//import { check_like } from "../static_functions/check_like.js";

async function fetchStoreData() {
    /*const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        .split('=')[1];*/

    const token = localStorage.getItem('token')

    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: token
            },
        };

        const apiUrl = "http://localhost:5000/api/store";

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data.games);
            const items = data.games
            for (let item in items) {
                const game_img = files.server_api_url + "/" + items[item].id_of_game.replace('#', '') + "/" + items[item].img;
                /*let data_for_print = `
            <div data-id="${items[item].id_of_game}" class="catalog_page_1_list_1_item_1">
            <a href="/game/${items[item].id_of_game.replace('#', '')}">
                <img class="item_image catalog_page_1_list_1_item_image" src="${game_img}" alt="">
            </a>
            <div class="catalog_page_1_list_1_item_info">
                <a class="catalog_page_1_list_1_item_link" href="/game/${items[item].id_of_game.replace('#', '')}">
                    <div class="item_name catalog_page_1_list_1_item_name catalog_page_1_list_1_item_name_style">${items[item].name}</div>
                </a>
                <div class="catalog_page_1_list_1_item_price">
                    <div class="catalog_page_1_list_1_item_price_style">${items[item].price}</div>`;
                let game_purchased = check_purchase(items[item].id_of_game);
                console.log((await game_purchased).valueOf());
                if ((await game_purchased).valueOf()) {
                    data_for_print += `
                    <div class="check_purchase">
                        <a href="/game/${items[item].id_of_game.replace('#', '')}">
                            <button class="button_basket_event_1 button_basket"><div store-button="" class="">purchased</div></button>
                        </a>
                    </div>`;
                } else {
                    data_for_print += `
                    <div class="check_purchase">
                        <button class="button_basket_event_2 button_basket"><div store-button="" class="">buy now</div></button>
                    </div>`;
                }
                data_for_print += `
                        </div>
                    </div>
                </div>`;*/
                let data_for_print = `
                <div data-id="${items[item].id_of_game}" class="catalog_page_1_list_1_item_1">
                    <a href="/game/${items[item].id_of_game.replace('#', '')}">
                        <img class="item_image catalog_page_1_list_1_item_image" src="${game_img}" alt="">
                    </a>
                    <div class="catalog_page_1_list_1_item_info">
                        <a class="catalog_page_1_list_1_item_link" href="/game/${items[item].id_of_game.replace('#', '')}">
                            <div class="item_name catalog_page_1_list_1_item_name catalog_page_1_list_1_item_name_style">${items[item].name}</div>
                        </a>
                        <div class="catalog_page_1_list_1_item_like_button">
                            <img class="like_button_style catalog_page_1_list_1_item_like_button_style" src="/svg/like_button_not_active.svg" alt="not-active">
                        </div>
                        <div class="catalog_page_1_list_1_item_price">
                            <div class="catalog_page_1_list_1_item_price_style">${items[item].price}</div>
                            <div class="check_purchase">
                                <button class="button_basket_event_2 button_basket"><div store-button="" class="">buy now</div></button>
                            </div>
                        </div>
                    </div>
                </div>`;
                document.querySelector('.catalog_page_1_list_1').innerHTML += data_for_print;
            }
            check_purchase();
            //check_like();
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

fetchStoreData()

let id_of_game;

function get_item_data(data) {
    let parent = data.closest('.catalog_page_1_list_1_item_1');
    id_of_game = parent.getAttribute('data-id').replace('#', '');
    console.log(id_of_game);
}

document.addEventListener('click', (e) => {
    if (e.target.closest('.item_image') || e.target.closest('.item_name')) {
        console.log(e);
        get_item_data(e.target.closest('.item_image'));
        //fetchGameData();
        //window.location.href = `/store_test/${id_of_game}`;
    }
});

/*async function check_purchase(id_of_game) {
    const token = localStorage.getItem('token')

    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: token
            },
        };

        const apiUrl = `http://localhost:5000/api/purchase/${id_of_game.replace('#', '')}`;

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data.game_purchased);
            const item = data.game_purchased;
            if (item === id_of_game) {
                return true;
            } else {
                return false;
            }
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}*/

export function getIdOfGame() {
    return id_of_game;
}