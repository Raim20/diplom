async function fetchAddData() {
    /*const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        .split('=')[1];*/

    const token = localStorage.getItem('token')

    try {
        const name = document.getElementById("game_name_to_edit").value;
        const id_of_game = document.getElementById("game_id_to_edit").value;
        const price = document.getElementById("game_price_to_edit").value;
        const info = document.getElementById("game_info_to_edit").value;
        const genres = document.getElementById("game_genres_to_edit").value;
        const stats= document.getElementById("game_stats_to_edit").value;
        // const = document.getElementById("").value;
        // const = document.getElementById("").value;

        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: token
            },
            body: JSON.stringify({ name: name, id_of_game: id_of_game, price: price, info: info, genres: genres, stats: stats, })
        };

        const apiUrl = "http://localhost:5000/api/store";

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data.message);
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}