export async function check_like() {
    const token = localStorage.getItem('token')

    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: token
            },
        };

        // const apiUrl = `http://localhost:5000/api/purchase/${id_of_game.replace('#', '')}`;
        const apiUrl = `http://localhost:5000/api/like`;

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data.game_liked);
            const likedGames = document.querySelectorAll('.catalog_page_1_list_1_item_1');

            likedGames.forEach((checkGame) => {
                //const genreId = checkbox.id;
                console.log(checkGame.getAttribute('data-id'));
                let data_for_print;
                const likeButton = checkGame.querySelector('.catalog_page_1_list_1_item_like_button')
                if (data.game_liked.includes(checkGame.getAttribute('data-id'))) {
                    likeButton.innerHTML = `<img class="like_button_style catalog_page_1_list_1_item_like_button_style" src="/svg/like_button_active.svg" alt="active">`;
                    //checkgame.setAttribute('data-id', '');
                    //document.querySelector('.catalog_page_1_list_1_item_like_button').innerHTML = `<img class="like_button_style catalog_page_1_list_1_item_like_button_style" src="/svg/like_button_active.svg" alt="active">`;
                    // document.querySelector('.like_button_style').src = "/svg/like_button_active.svg";
                    // document.querySelector('.like_button_style').src = "/svg/like_button_active.svg";
                    // document.querySelector('.like_button_style').alt = "active";
                }
            });
            /*const item = data.game_purchased;
            if (item === id_of_game) {
                return true;
            } else {
                return false;
            }*/
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

//check_like();

window.addEventListener('load', function () {
    check_like();
});
