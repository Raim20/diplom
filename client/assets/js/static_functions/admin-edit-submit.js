import { files } from "./default.js";

const gameContainer = document.querySelector('.update_container');
const id_of_game = gameContainer.getAttribute('data-id').replace('#', '');
console.log(id_of_game);

const selectedItems = [];
const checkboxes = document.querySelectorAll('.game_genres_to_create');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (event) => {
        const value = event.target.value;
        if (event.target.checked) {
            selectedItems.push(value);
        } else {
            const index = selectedItems.indexOf(value);
            if (index > -1) {
                selectedItems.splice(index, 1);
            }
        }
    });
});

const selectedPlatform = [];
const checkboxPlatform = document.querySelectorAll('.game_genres_to_update');

checkboxPlatform.forEach(checkbox => {
    checkbox.addEventListener('change', (event) => {
        const value = event.target.value;
        if (event.target.checked) {
            selectedPlatform.push(value);
        } else {
            const index = selectedPlatform.indexOf(value);
            if (index > -1) {
                selectedPlatform.splice(index, 1);
            }
        }
    });
});

const selectedLanguage = [];
const checkboxLanguage = document.querySelectorAll('.game_stats_language_to_update');

checkboxLanguage.forEach(checkbox => {
    checkbox.addEventListener('change', (event) => {
        const value = event.target.value;
        if (event.target.checked) {
            selectedLanguage.push(value);
        } else {
            const index = selectedLanguage.indexOf(value);
            if (index > -1) {
                selectedLanguage.splice(index, 1);
            }
        }
    });
});

/*const selectedPublisher = [];
const checkboxPublisher = document.querySelectorAll('.game_genres_to_update');

checkboxPublisher.forEach(checkbox => {
    checkbox.addEventListener('change', (event) => {
        const value = event.target.value;
        if (event.target.checked) {
            selectedPublisher.push(value);
        } else {
            const index = selectedPublisher.indexOf(value);
            if (index > -1) {
                selectedPublisher.splice(index, 1);
            }
        }
    });
});

const selectedDeveloper = [];
const checkboxDeveloper = document.querySelectorAll('.game_genres_to_update');

checkboxDeveloper.forEach(checkbox => {
    checkbox.addEventListener('change', (event) => {
        const value = event.target.value;
        if (event.target.checked) {
            selectedDeveloper.push(value);
        } else {
            const index = selectedDeveloper.indexOf(value);
            if (index > -1) {
                selectedDeveloper.splice(index, 1);
            }
        }
    });
});*/

const selectedMode = [];
const checkboxMode = document.querySelectorAll('.game_stats_mode_to_update');

checkboxMode.forEach(checkbox => {
    checkbox.addEventListener('change', (event) => {
        const value = event.target.value;
        if (event.target.checked) {
            selectedMode.push(value);
        } else {
            const index = selectedMode.indexOf(value);
            if (index > -1) {
                selectedMode.splice(index, 1);
            }
        }
    });
});

async function fetchEditData() {
    const token = localStorage.getItem('token')
    const genresInput = document.getElementById("game_genres_to_create");
    //const genres = genresInput.value.split(",").map((genre) => genre.trim());

    const selectedPublisher = document.getElementById("game_stats_publisher_to_update_label");
    const selectedDeveloper = document.getElementById("game_stats_developer_to_update_label");

    const stats_data = {
        platform: selectedPlatform,
        release_date: document.getElementById("game_stats_release_date_to_update_label").value,
        languages: selectedLanguage,
        size: document.getElementById("game_stats_size_to_update_label").value,
        publisher: selectedPublisher.value.split(",").map((genre) => genre.trim()),
        developer: selectedDeveloper.value.split(",").map((genre) => genre.trim()),
        mode: selectedMode,
    };

    console.log(stats_data);

    const edited_data = {
        name: document.getElementById("game_name_to_update").value,
        id_of_game: document.getElementById("game_id_to_update").value,
        price: document.getElementById("game_price_to_update").value,
        info: document.getElementById("game_info_to_update_text").value,
        genres: selectedItems,
        stats: stats_data,
    };

    console.log(edited_data);

    try {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            body: JSON.stringify({ data: edited_data })
            //body: JSON.stringify({ id_of_game: id_of_game} )
        };

        const apiUrl = `http://localhost:5000/api/admin/edit/${id_of_game}`;

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data.message);
            console.log(data.game_edited_data.id_of_game);
            fetchUploadFile(data.game_edited_data.id_of_game.replace('#', ''));
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

if (id_of_game) {
    document.addEventListener('click', (e) => {
        if (e.target.closest('.game_save_button')) {
            console.log(e);
            fetchEditData();
        }
    });
}

const formData = new FormData();

async function fetchUploadFile(id_of_game) {
    const token = localStorage.getItem('token')

    // const formData = new FormData();
    // formData.append('img', fileInput);

    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json',
                Authorization: token,
            },
            body: formData,
            //body: JSON.stringify({ id_of_game: id_of_game} )
        };

        const apiUrl = `http://localhost:5000/api/admin/img/${id_of_game}`;

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data.message);
            const game_img = document.getElementById("img_of_game");
            game_img.src = files.server_api_url + "/" + data.game.id_of_game.replace('#', '') + "/" + data.game.img;
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

document.addEventListener('click', (e) => {
    if (e.target.closest('.game_img')) {
        console.log(e);
        const fileInput = document.getElementById("game_img_to_update");
        fileInput.click();
    }
});

document.getElementById('game_img_to_update').addEventListener('change', async (e) => {
    const fileInput = e.target;
    const file = fileInput.files[0];
    if (file) {
        // const formData = new FormData();
        formData.append('img', file);
        // fetchUploadFile(file);
        const reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById("img_of_game").src = e.target.result;
        };

        reader.readAsDataURL(file);
    } else {
        document.getElementById("img_of_game").src = ''; // Очистить изображение, если файл не выбран
    }
});



// let id_of_game = null;
//
// function get_item_data(data) {
//     let parent = data.closest('.catalog_page_1_list_1_item_1');
//     id_of_game = parent.getAttribute('data-id');
//     console.log(id_of_game);
// }

