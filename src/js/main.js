window.addEventListener('DOMContentLoaded', () => {

    /* slider */
    const slides = document.querySelectorAll('.inner__slide');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    const slidesWrapper = document.querySelector('.slider__wrapper');
    const slidesField = document.querySelector('.carusel__inner');
    const width = window.getComputedStyle(slidesWrapper).width; 


    let offset = 0;

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';


    slides.forEach(slide => {
        slide.style.width = width;
    });


    next.addEventListener('click', () => {

        if (offset === +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else { 
            offset += +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

    });

    prev.addEventListener('click', () => {
        if (offset === 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
    });
});