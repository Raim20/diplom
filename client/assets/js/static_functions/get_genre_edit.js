const data = [ "Action", "Action-Adventure", "Adventure", "Card Game", "Casual", "City Builder",
    "Dungeon Crawler", "Exploration", "Fantasy", "Fighting", "Horror", "Music", "Narration",
    "Open World", "Platformer", "Puzzle", "Racing", "RPG", "RTS", "Shooter", "Simulation",
    "Sports", "Stealth", "Strategy", "Survival", "Tower Defense", "FPS", "Visual novel", "MMO",
    "MMORPG", "Roguelike", "Battle Royale", "Sandbox" ];

async function fetchGetGenre() {
    const token = localStorage.getItem('token')

    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: token
            },
        };

        const apiUrl = "http://localhost:5000/api/data/genre";

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data.genres);
            const items = data.genres
            for (let item in items) {
                const data_for_print = `
                    <div class="game_genres_to_create_label">
                        <input id="${items[item].id_of_genre}" class="game_genres_to_update" type="checkbox" placeholder="${items[item].genre}" name="${items[item].genre.toLowerCase()}" value="${items[item].genre}">
                        <label class="genre_style" for="${items[item].id_of_genre}">${items[item].genre}</label>
                    </div>`;
                document.querySelector('.game_genres_to_create').innerHTML += data_for_print;
            }
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

fetchGetGenre();

function print(data) {
    for (let item in data) {
        const data_for_print = `
                    <input id="${data[item]}" class="" type="checkbox" placeholder="${capitalizeFirstLetter(data[item])}" name="${data[item]}" value="data[item]">
                    <label for="${data[item]}">${capitalizeFirstLetter(data[item])}</label>`;
        document.querySelector('.game_genres_to_create').innerHTML += data_for_print;
    }
}

// print(data);

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}