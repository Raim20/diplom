const showPopupBtn = document.getElementById('showPopupBtn');
const popup = document.getElementById('popup');
const closePopupBtn = document.getElementById('closePopupBtn');

export function showPopup() {
    popup.classList.remove('hiding');
    popup.classList.add('show');
}

export function hidePopup(event) {
    event.stopPropagation();
    popup.classList.remove('show');
    popup.classList.add('hiding');
}

export function showAgainPopup(event) {
    if (popup.classList.contains('hiding')) {
        event.stopPropagation();
        popup.classList.remove('hiding');
        popup.classList.add('show');
    }
    // event.stopPropagation();
    // popup.classList.remove('hiding');
    // popup.classList.add('show');
}

popup.addEventListener('mousedown', (event) => {
    if (popup.classList.contains('hiding')) {
        event.stopPropagation();
    }
});

popup.addEventListener('mouseup', (event) => {
    if (popup.classList.contains('hiding')) {
        event.stopPropagation();
    }
});

// showPopupBtn.addEventListener('click', showPopup);
closePopupBtn.addEventListener('click', hidePopup);
popup.addEventListener('click', showAgainPopup);