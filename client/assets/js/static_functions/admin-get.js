import { files } from './default.js';

async function fetchGameData(page) {
    const token = localStorage.getItem('token')

    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: token
            },
        };

        const apiUrl = `http://localhost:5000/api/admin?page=${page}`;

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data.games);
            const items = data.games
            for (let item in items) {
                const data_for_print = `
                    <a class="admin_item_link" href="/admin/edit/${items[item].id_of_game.replace('#', '')}">
                        <div data-id="${items[item].id_of_game}" class="page_basket_item_style">
                            <div class="basket_item_image">
                                <img class="basket_item_image_style" src="${files.server_api_url}/${items[item].id_of_game.replace('#', '')}/${items[item].img}" alt="">
                            </div>
                            <div class="page_basket_item_info">
                                <div class="basket_item_name">${items[item].name}</div>
                                <div class="page_basket_item_info_style">
                                    <div class="basket_item_price">${items[item].price}</div>
                                </div>
                            </div>
                        </div>
                    </a>`;
                document.querySelector('.admin_items').innerHTML += data_for_print;
            }
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

document.getElementById('nextPageButton').addEventListener('click', () => {
    currentPage++;
    fetchGameData(currentPage);
});

let currentPage = 1;
fetchGameData(currentPage);



// import { files } from './default.js';
//
// async function fetchGetData() {
//     const token = localStorage.getItem('token')
//
//     try {
//         const requestOptions = {
//             method: 'GET',
//             headers: {
//                 Authorization: token
//             },
//         };
//
//         const apiUrl = "http://localhost:5000/api/admin";
//
//         const response = await fetch(apiUrl, requestOptions);
//         const data = await response.json();
//
//         if (response.ok) {
//             console.log(data.games);
//             const items = data.games
//             for (let item in items) {
//                 const data_for_print = `
//                     <a class="admin_item_link" href="/admin/edit/${items[item].id_of_game.replace('#', '')}">
//                         <div data-id="${items[item].id_of_game}" class="page_basket_item_style">
//                             <div class="basket_item_image">
//                                 <img class="basket_item_image_style" src="${files.server_api_url}/${items[item].id_of_game.replace('#', '')}/${items[item].img}" alt="">
//                             </div>
//                             <div class="page_basket_item_info">
//                                 <div class="basket_item_name">${items[item].name}</div>
//                                 <div class="page_basket_item_info_style">
//                                     <div class="basket_item_price">${items[item].price}</div>
//                                 </div>
//                             </div>
//                         </div>
//                     </a>`;
//                 document.querySelector('.admin_items').innerHTML += data_for_print;
//             }
//         } else {
//             console.error(data.message);
//         }
//     } catch (error) {
//         console.error('Ошибка:', error);
//     }
// }
//
// fetchGetData();