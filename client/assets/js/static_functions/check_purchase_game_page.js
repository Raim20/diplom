export async function check_purchase(id_of_game, releaseDateContainer) {
    const token = localStorage.getItem('token')

    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: token
            },
        };

        const apiUrl = `http://localhost:5000/api/purchase/${id_of_game.replace('#', '')}`;
        //const apiUrl = `http://localhost:5000/api/purchase`;

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data.game_purchased_date);
            const checkGames = document.querySelectorAll('.game_container');
            // checkGames.forEach((checkGame) => {
            //     const releaseDateContainer = checkGame.querySelector('.game_release_date_container');
            //     const id_of_game = checkGame.getAttribute('data-id');
            //     check_purchase(id_of_game, releaseDateContainer);
            // });
            // const checkGame = document.getElementsByClassName('game_release_date_container');
            //const date = new Date(`${data.game_purchased_date}`);
            const monthNamesShort = [
                "Jan", "Feb", "Mar",
                "Apr", "May", "Jun", "Jul",
                "Aug", "Sep", "Oct",
                "Nov", "Dec"
            ];

            //const monthIndex = date.getMonth();
            const monthName = monthNamesShort[data.game_purchased_date.month];
            const releaseDateDay = releaseDateContainer.querySelector('.game_release_date_day');
            const releaseDateMonthYear = releaseDateContainer.querySelector('.game_release_date_month_year');

            releaseDateDay.textContent = data.game_purchased_date.day;
            releaseDateMonthYear.textContent = `${monthName} ${data.game_purchased_date.year}`;
            // const releaseDateDay = checkGame.querySelector('.game_release_date_day');
            // const releaseDateMonthYear = checkGame.querySelector('.game_release_date_month_year');

            // releaseDateDay.textContent = date.getDate();
            // releaseDateMonthYear.textContent = `${monthName} ${date.getFullYear()}`;
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

//check_purchase();

window.addEventListener('load', function () {
    const checkGames = document.querySelectorAll('.game_container');
    checkGames.forEach((checkGame) => {
        const releaseDateContainer = checkGame.querySelector('.game_release_date_container');
        const id_of_game = checkGame.getAttribute('data-id');
        check_purchase(id_of_game, releaseDateContainer);
    });

    // const checkGames = document.querySelectorAll('.game_container');
    // checkGames.forEach((checkGame) => {
    //     const id_of_game = checkGame.getAttribute('data-id');
    //     check_purchase(id_of_game);
    // });
});
