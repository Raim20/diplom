import { files } from "./default.js";

const gameContainer = document.querySelector('.update_container');
const id_of_game = gameContainer.getAttribute('data-id').replace('#', '');
console.log(id_of_game);

async function fetchGetEditData() {
    const token = localStorage.getItem('token')

    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: token
            },
            //body: JSON.stringify({ id_of_game: id_of_game} )
        };

        const apiUrl = `http://localhost:5000/api/admin/edit/${id_of_game}`;

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data.game);
            const item = data.game
            document.getElementById("game_name_to_update").value = item.name;
            document.getElementById("game_id_to_update").value = item.id_of_game;
            document.getElementById("game_price_to_update").value = item.price;
            document.getElementById("img_of_game").src = files.server_api_url + "/" + data.game.id_of_game.replace('#', '') + "/" + item.img;
            //document.getElementById("game_info_to_update").value = item.info;
            document.getElementById("game_info_to_update_text").value = item.info;
            document.getElementById("game_stats_release_date_to_update_label").value = item.stats[0].release_date;
            document.getElementById("game_stats_size_to_update_label").value = item.stats[0].size;
            document.getElementById("game_stats_publisher_to_update_label").value = item.stats[0].publisher.join(", ");
            document.getElementById("game_stats_developer_to_update_label").value = item.stats[0].developer.join(", ");
            //document.getElementById("game_genres_to_update").value = item.genres.join(", ");
            //document.getElementById("game_stats_to_update").value = item.stats;

            const selectedGenres = item.genres;
            const checkboxes = document.querySelectorAll('.game_genres_to_update');
            checkboxes.forEach((checkbox) => {
                const genreId = checkbox.id;
                // console.log(checkbox.value);
                if (selectedGenres.includes(checkbox.value)) {
                    checkbox.checked = true;
                }
            });

            const selectedLanguage = item.stats[0].languages;
            const checkboxLanguage = document.querySelectorAll('.game_stats_language_to_update');
            checkboxLanguage.forEach((checkbox) => {
                const genreId = checkbox.id;
                // console.log(checkbox.value);
                if (selectedLanguage.includes(checkbox.value)) {
                    checkbox.checked = true;
                }
            });

            const selectedMode = item.stats[0].mode;
            const checkboxMode = document.querySelectorAll('.game_stats_mode_to_update');
            checkboxMode.forEach((checkbox) => {
                const genreId = checkbox.id;
                // console.log(checkbox.value);
                if (selectedMode.includes(checkbox.value)) {
                    checkbox.checked = true;
                }
            });

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
    fetchGetEditData();
}