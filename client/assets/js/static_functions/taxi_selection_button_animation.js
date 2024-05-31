const catalogItems = document.querySelectorAll('.popup_card_style');

for (let catalogItem of catalogItems) {
    const itemImage = catalogItem.querySelector('.popup_card_image');
    const originalPath = itemImage.getAttribute('src');
    const hoverPath = originalPath.replace('not_active', 'active');

    catalogItem.addEventListener('mouseenter', () => {
        if (popup.classList.contains('show')) {
            itemImage.setAttribute('src', hoverPath);   
        }
    });

    catalogItem.addEventListener('mouseleave', () => {
        if (popup.classList.contains('show')) {
            itemImage.setAttribute('src', originalPath);   
        }
    });
}