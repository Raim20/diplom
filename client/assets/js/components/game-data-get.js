//import { getIdOfGame } from "./store-get.js";
import { files } from "../static_functions/default.js";
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
            document.querySelector('#game_image').src = game_img;
            //const formattedDate = new Date(item.stats[0].release_date).toLocaleDateString();
            const date = new Date(`${item.stats[0].release_date}`);
            const monthNamesShort = [
                "Jan", "Feb", "Mar",
                "Apr", "May", "Jun", "Jul",
                "Aug", "Sep", "Oct",
                "Nov", "Dec"
            ];

            const monthIndex = date.getMonth();
            const monthName = monthNamesShort[monthIndex];
            document.querySelector('.game_release_date_day').textContent = date.getDate();
            document.querySelector('.game_release_date_month_year').textContent = `${monthName} ${date.getFullYear()}`;
            document.querySelector('.game_name').textContent = item.name;
            document.querySelector('.game_des_text').textContent = item.info;
            document.querySelector('.game_price_text').textContent = item.price;
            document.querySelector('.game_genre_text').textContent = item.genres.join(", ");
            document.querySelector('.game_platform_text').textContent = item.stats[0].platform.join(", ");
            document.querySelector('.game_release_date_text').textContent = `${date.getDate()} ${monthName} ${date.getFullYear()}`;
            document.querySelector('.game_publisher_text').textContent = item.stats[0].publisher.join(", ");
            document.querySelector('.game_developer_text').textContent = item.stats[0].developer.join(", ");
            document.querySelector('.game_size_text').textContent = item.stats[0].size;

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