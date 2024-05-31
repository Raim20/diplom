const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.carousel-slide');
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let currentIndex = 0;

function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function autoSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
}

let timer = setInterval(autoSlide, 3000);

carousel.addEventListener('mousedown', e => {
    isDragging = true;
    startPos = e.clientX;
    clearInterval(timer);
    document.body.style.cursor = 'grabbing';
});

carousel.addEventListener('mouseup', () => {
    isDragging = false;
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100 && currentIndex < slides.length - 1) {
        currentIndex += 1;
    }

    if (movedBy > 100 && currentIndex > 0) {
        currentIndex -= 1;
    }

    updateCarousel();
    document.body.style.cursor = 'grab';
    timer = setInterval(autoSlide, 3000);
});

carousel.addEventListener('mousemove', e => {
    if (isDragging) {
        const x = e.clientX;
        const translate = x - startPos;
        currentTranslate = prevTranslate + translate;
        carousel.style.transform = `translateX(${currentTranslate}px)`;
    }
});

carousel.addEventListener('mouseleave', () => {
    isDragging = false;
    document.body.style.cursor = 'grab';
    prevTranslate = currentTranslate;
});

// Initial update
updateCarousel();



// const animatedTextElements = document.querySelectorAll('.animated-text');
//
// function animateText(textElement) {
//     const textContent = textElement.textContent;
//     textElement.textContent = ''; // Очистить текст, чтобы добавить его посимвольно
//
//     let index = 0;
//
//     function addNextCharacter() {
//         if (index < textContent.length) {
//             textElement.style.opacity = 1;
//             textElement.textContent += textContent.charAt(index);
//             index++;
//             setTimeout(addNextCharacter, 100); // Интервал между символами (в миллисекундах)
//         }
//     }
//
//     addNextCharacter();
// }
//
// animatedTextElements.forEach((textElement) => {
//     animateText(textElement);
// });
//
//
// const carouselContainer = document.querySelector('.carousel_container');
// const images = document.querySelectorAll('.carousel_item_list');
//
// let currentIndex = 0;
//
// function updateCarousel() {
//     carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
// }
//
// function nextSlide() {
//     if (currentIndex < images.length - 1) {
//         currentIndex++;
//     } else {
//         currentIndex = 0;
//     }
//     updateCarousel();
// }
//
// function startAutoSlide() {
//     setInterval(() => {
//         nextSlide();
//     }, 3000); // Интервал автоматической смены изображений в миллисекундах (3 секунды)
// }
//
// startAutoSlide(); // Начать автоматическую смену изображений



// const imageContainer = document.querySelector('.carousel_item_header');
//
// imageContainer.addEventListener('mouseenter', () => {
//     animateDescText(document.querySelector('.description'));
// });
//
// function animateDescText(textElement) {
//     const textContent = textElement.textContent;
//     textElement.textContent = '';
//     let index = 0;
//
//     function addNextCharacter() {
//         if (index < textContent.length) {
//             textElement.style.opacity = 1;
//             textElement.textContent += textContent.charAt(index);
//             index++;
//             setTimeout(addNextCharacter, 20);
//         }
//     }
//
//     addNextCharacter();
// }





// const text = document.getElementById('animated-text');
// const textContent = text.textContent;
// text.textContent = ''; // Очистить текст, чтобы добавить его посимвольно
//
// let index = 0;
//
// function animateText() {
//     if (index < textContent.length) {
//         text.style.opacity = 1;
//         text.textContent += textContent.charAt(index);
//         index++;
//         setTimeout(animateText, 100); // Интервал между символами (в миллисекундах)
//     }
// }
//
// animateText();


// const image = document.getElementById("myImage");
// const description = document.getElementById("image-description");
//
// image.addEventListener("mouseover", () => {
//     image.style.transform = "scale(1.2)";
//     // description.style.display = "block";
// });
//
// image.addEventListener("mouseout", () => {
//     image.style.transform = "scale(1)";
//     // description.style.display = "none";
// });





// const image = document.getElementById('image');
// const description = document.getElementById('description');
//
// image.addEventListener('mouseenter', function () {
//     // При нажатии на изображение, увеличиваем его
//     image.style.transform = 'scale(1.2)';
//     // Отображаем описание
//     description.style.display = 'block';
// });
//
// image.addEventListener('mouseout', function () {
//     // При уводе курсора с изображения, возвращаем его к начальному размеру
//     image.style.transform = 'scale(1)';
//     // Скрываем описание
//     description.style.display = 'none';
// });
