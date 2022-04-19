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

    /* sending form data  */
    const form = document.querySelectorAll('form');
    const inputs = document.querySelectorAll('input');
    const phoneInputs = document.querySelectorAll('input[name="phone"]');

    phoneInputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '');
        });
    });

    const message = {
        loading: 'Загрузка..',
        success: 'Спасибо за вашу заявку!',
        failure: 'Что-то пошло не так'
    };


    const postData = async (url, data) => {
        
        document.querySelector('.status').textContent = message.loading;
        
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.style.cssText = `
                display: block;
                margin-top: 15px;
                text-align: center;
                color: #c70101;
            `;
            item.appendChild(statusMessage);

            const formData = new FormData(item);

            postData('server.php', formData)
                .then(res => {
                    console.log(res);
                    
                    statusMessage.textContent = message.success;
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 1500);
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 4000);
                });
        });
    });
});