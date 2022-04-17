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

    /* modals */

    function bindModal(triggerSelector, modalSelector, closeSelector) {
        const trigger = document.querySelectorAll(triggerSelector);
        const modal = document.querySelector(modalSelector);
        const close = document.querySelector(closeSelector);
        const overlay = document.querySelector('.overlay');
    
        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                e.target.blur();
                overlay.style.display = 'block';
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
    
            });
        });
    
        close.addEventListener('click', () => {
    
            overlay.style.display = 'none';
            modal.style.display = 'none';
            document.body.style.overflow = ''; 
    
        });
    
        overlay.addEventListener('click', (e) => {
            if(e.target === overlay) {
                overlay.style.display = 'none';
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    
        document.addEventListener('keydown', (e) => {
            if(e.code === 'Escape' &&  overlay.style.display === 'block') {
                overlay.style.display = 'none';
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    
    }
    
    bindModal('[data-modal]', '#consultation', '.modal__close');
    bindModal('.btn_min', '#order', '[data-order]');
});