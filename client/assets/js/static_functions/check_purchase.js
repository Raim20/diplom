export async function check_purchase() {
    const token = localStorage.getItem('token')

    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: token
            },
        };

        // const apiUrl = `http://localhost:5000/api/purchase/${id_of_game.replace('#', '')}`;
        const apiUrl = `http://localhost:5000/api/purchase`;

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data.game_purchased);
            const checkGames = document.querySelectorAll('.catalog_page_1_list_1_item_1');

            checkGames.forEach((checkGame) => {
                //const genreId = checkbox.id;
                console.log(checkGame.getAttribute('data-id'));
                let data_for_print;
                const purchaseButton = checkGame.querySelector('.check_purchase');
                if (data.game_purchased.includes(checkGame.getAttribute('data-id'))) {
                    console.log(purchaseButton);
                    //checkgame.setAttribute('data-id', '');
                    data_for_print = `
                        <a href="/game/${checkGame.getAttribute('data-id').replace('#', '')}">
                            <button class="button_basket_event_1 button_basket"><div store-button="" class="">purchased</div></button>
                        </a>`;
                    purchaseButton.innerHTML = data_for_print;
                    //document.querySelector('.check_purchase').innerHTML = data_for_print;
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

check_purchase();

