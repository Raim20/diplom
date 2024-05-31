import { files } from "./default.js";
import { check_purchase } from "./check_purchase.js";
//import { check_like } from "./check_like.js";

async function fetchGameGetByGenres() {
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

        const genre = "Adventure";
        const apiUrl = `http://localhost:5000/api/gamebydate`;

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data.games);
            const items = data.games
            for (let item in items) {
                const game_img = files.server_api_url + "/" + items[item].id_of_game.replace('#', '') + "/" + items[item].img;
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
                document.querySelector('.catalog_page_1_list_3').innerHTML += data_for_print;
            }
            //check_like();
            check_purchase();
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

fetchGameGetByGenres();