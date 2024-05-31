const catalogItems = document.querySelectorAll('.search-input-container');

for (let catalogItem of catalogItems) {
    const getLocationButton = catalogItem.querySelector('.get_location');
    const itemImage = catalogItem.querySelector('.get_location_image');
    const originalPath = itemImage.getAttribute('src');
    const hoverPath = originalPath.replace('not_active', 'active');

    getLocationButton.addEventListener('mouseenter', () => {
        itemImage.setAttribute('src', hoverPath);
        getLocationButton.classList.remove('hidden');
    });

    getLocationButton.addEventListener('mouseleave', () => {
        itemImage.setAttribute('src', originalPath);
        getLocationButton.classList.add('hidden');
    });
}

// const startContainer = document.getElementById('start-search-input-container');
//     const endContainer = document.getElementById('end-search-input-container');
//     const startInput = document.getElementById('start-input');
//     const endInput = document.getElementById('end-input');

//     startInput.addEventListener('focus', () => {
//         startContainer.classList.add('active');
//         endContainer.classList.remove('active');
//     });

//     endInput.addEventListener('focus', () => {
//         endContainer.classList.add('active');
//         startContainer.classList.remove('active');
//     });