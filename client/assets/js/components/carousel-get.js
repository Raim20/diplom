async function fetchCarousel() {
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

        const apiUrl = "http://localhost:5000/api/store";

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data.games);
            const items = data.games
            for (let item in items) {
                if (item < 3) {
                    const data_for_print = `
            <div class="carousel-slide">
                <img src="/image/banner_Death_Stranding.png" alt="Image 1">
                <div class="carousel-info">
                    <div class="carousel-name carousel-name-style">${items[item].name}</div>
                    <div class="carousel-price">
                        <div class="carousel-price-style">${items[item].price}</div>
                        <button class="carousel-button-basket"><div class="">buy now</div></button>
                    </div>
                    <div id="image-description" class="carousel-description">${items[item].info}</div>
                </div>
            </div>`;
                    document.querySelector('.carousel').innerHTML += data_for_print;
                } else {
                    break;
                }
            }
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

fetchCarousel()