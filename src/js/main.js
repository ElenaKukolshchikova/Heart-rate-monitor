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

    /* tabs */

    const tabs = document.querySelectorAll('.catalog__tab');
    const tabsParent = document.querySelector('.catalog__tabs');
    const tabContent = document.querySelectorAll('.catalog__content');


    function hideTabContent() {
        tabContent.forEach(item => {
            item.style.display = 'none';
        });

        tabs.forEach(item => {
            item.classList.remove('catalog__tab_active');
        });
    }

    function showTabContent(i = 0) {
            tabContent[i].style.display = 'flex';
            tabs[i].classList.add('catalog__tab_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if(target && target.classList.contains('catalog__tab')) {
            tabs.forEach((item, i) => {
                if(target === item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    /* for animation */
    new WOW().init();
});