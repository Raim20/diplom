async function fetchRemoveLikes() {
    const token = localStorage.getItem('token')

    try {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            body: JSON.stringify({ id_of_game: card_temp.id_of_game })
        };

        const apiUrl = `http://localhost:5000/api/like`;

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data.message);
            console.log(data.likes);
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

let card_temp = {}

function get_item_data(data) {
    let parent = data.closest('.catalog_page_1_list_1_item_1');
    card_temp = {
        id_of_game: parent.getAttribute('data-id'),
        alt: parent.querySelector('.like_button_style').getAttribute('alt'),
    }
    console.log(card_temp);
}

document.addEventListener('click', (e) => {
    if (e.target.closest('.like_button_style')) {
        console.log(e);
        get_item_data(e.target.closest('.like_button_style'));
        if (card_temp.alt === "active") {
            fetchRemoveLikes();
        }
    }
});