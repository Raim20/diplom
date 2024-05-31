//import { getIdOfGame } from "./store-get.js";
import { files } from "./default.js";
//const id_of_game = getIdOfGame();
const gameContainer = document.querySelector('.game_container');
const id_of_game = gameContainer.getAttribute('data-id').replace('#', '');
console.log(id_of_game);

// const id_of_game = id_of_game;

async function fetchGameData() {
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
            //body: JSON.stringify({ id_of_game: id_of_game} )
        };

        const apiUrl = `http://localhost:5000/api/game/${id_of_game}`;

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data.game);
            const item = data.game
            const game_img = files.server_api_url + "/" + item.id_of_game.replace('#', '') + "/" + item.img;
            const data_for_print = `
            <div data-id="${item.id_of_game}" class="game_name">${item.name}</div>
            <div class="a">
                <img class="game_image" src="${game_img}" alt="">
                <div class="game_info">
                    <div class="b game_info_style_name">Name:</div>
                    <div class="a">
                        <div class="b game_info_style_price">Price:</div>
                        <div class="game_price">${item.price}</div>
                    </div>
                    <div class="game_stats"></div>
                </div>
            </div>`;
            document.querySelector('.game_container').innerHTML = data_for_print;
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

// let id_of_game = null;
//
// function get_item_data(data) {
//     let parent = data.closest('.catalog_page_1_list_1_item_1');
//     id_of_game = parent.getAttribute('data-id');
//     console.log(id_of_game);
// }

if (id_of_game) {
    fetchGameData();
}

//fetchGameData()

// document.addEventListener('click', (e) => {
//     if (e.target.closest('.item_image') || e.target.closest('.item_name')) {
//         console.log(e);
//         get_item_data(e.target.closest('.item_image'));
//         //fetchGameData();
//     }
// });