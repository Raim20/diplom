import { files } from "./default.js";

async function fetchUserGames() {
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

        const apiUrl = "http://localhost:5000/api/games";

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        let dataToInsert = "";
        if (response.ok) {
            console.log(data.games);
            const items = data.games
            for (let item in items) {
                const game_img = files.server_api_url + "/" + items[item].game.id_of_game.replace('#', '') + "/" + items[item].game.img;
                const data_for_print = `
                    <a class="user_games_link" href="/game/${items[item].game.id_of_game.replace('#', '')}">
                        <div data-id="${items[item].game.id_of_game}" class="user_item_style">
                            <div class="user_item_image">
                                <img class="user_item_image_style" src="${game_img}" alt="">
                            </div>
                            <div class="user_item_stats">
                                <div class="user_item_info_1">
                                    <div class="user_item_name user_item_added_data">${formatDate(items[item].addedAt)}</div>
                                </div>
                                <div class="user_item_info">
                                    <div class="user_item_name">${items[item].game.name}</div>
                                    <div class="user_item_info_style">
                                        <div class="user_item_price">${items[item].game.price}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>`;
                dataToInsert += data_for_print;
                // document.querySelector('.user_items').innerHTML += data_for_print;
            }
            document.querySelector('.user_items').innerHTML = dataToInsert;
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

// <div className="basket_item_name">${items[item].}</div>
document.addEventListener('click', (e) => {
    if (e.target.closest('.games_of_user')) {
        console.log(e);
        fetchUserGames()
    }
});

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}