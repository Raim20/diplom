document.addEventListener("DOMContentLoaded", function() {
    const myBlock = document.getElementById('container');
    const currentUrl = window.location.href;

    if (currentUrl.includes('/') || currentUrl.includes('/index') || currentUrl.includes('/user')) {
        myBlock.classList.add('user');
    } else if (currentUrl.includes('/driver')) {
        myBlock.classList.add('driver');
    }
});