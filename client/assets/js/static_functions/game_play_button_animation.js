const imageContainer = document.getElementById('game_play_button_container');
const game_play_button_1 = document.getElementById('game_play_button_1');
const game_play_button_2 = document.getElementById('game_play_button_2');

function startTransition() {
    if (game_play_button_1.style.opacity === '0') {
        game_play_button_1.style.opacity = '1';
        game_play_button_2.style.opacity = '0';
    } else {
        game_play_button_1.style.opacity = '0';
        game_play_button_2.style.opacity = '1';
    }
}

function resetTransition() {
    game_play_button_1.style.opacity = '1';
    game_play_button_2.style.opacity = '0';
}

imageContainer.addEventListener('mouseout', function() {
    resetTransition();
    //console.log('Мышь покинула элемент!');
});

imageContainer.addEventListener('mouseover', function() {
    startTransition();
    //console.log('Мышь наведена на элемент!');
});