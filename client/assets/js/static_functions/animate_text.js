const animatedTextElements = document.querySelectorAll('.animated-text');

function animateText(textElement) {
    const textContent = textElement.textContent;
    textElement.textContent = ''; // Очистить текст, чтобы добавить его посимвольно

    let index = 0;

    function addNextCharacter() {
        if (index < textContent.length) {
            textElement.style.opacity = 1;
            textElement.textContent += textContent.charAt(index);
            index++;
            setTimeout(addNextCharacter, 100); // Интервал между символами (в миллисекундах)
        }
    }

    addNextCharacter();
}

animatedTextElements.forEach((textElement) => {
    animateText(textElement);
});