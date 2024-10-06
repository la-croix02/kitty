"use strict";
window.addEventListener('DOMContentLoaded', () => {

// Объявление переменных 
    const burgerMenu = document.querySelector('.burger-menu'),
          menuList = document.querySelector('.header .menu'),
          body = document.querySelector('body'),
          menuListItems = document.querySelectorAll('.js-scroll-to'),
          modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalClose = document.querySelectorAll('[data-close]'),
          dateInput = document.querySelectorAll('.modal__window-field-date'),
          phoneInput = document.querySelector('[name="phone"]'),
          form = document.querySelector('form'),
          resultModal = document.querySelector('.modal-result');

    let widthScroll = '';

console.log(modalClose)
// Бургер меню
    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        menuList.classList.toggle('active');
        body.classList.toggle('active');
    })

// Скролл по пунктам меню
    menuListItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            burgerMenu.classList.remove('active');
            menuList.classList.remove('active');
            body.classList.remove('active');
            const sectionId = item.getAttribute('href').substring(1);

            document.getElementById(sectionId).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        })
    })

// Модальное окно
    modalTrigger.forEach(item => {
        item.addEventListener('click', () => {
            openModal();
        })
    })

    modalClose.forEach(item => {
        item.addEventListener('click', () => {
            closeModal(form);
            removeBodyPadding();
        })
    })

    resultModal.addEventListener('click', (event) => {
        if (event.target == resultModal) {
            closeModal(form);
            removeBodyPadding();
        }
    })

    modal.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal(form);
            removeBodyPadding();
        }
    })

    window.addEventListener('scroll', showModalByScroll)

    const modalTimerId = setTimeout(openModal, 30000)

    
    function openModal() {
        widthScroll = window.innerWidth - modal.offsetWidth + 'px';
        body.classList.add('active');
        modal.classList.add('active');
        body.style.paddingRight = widthScroll;
        clearInterval(modalTimerId);
    }

    function closeModal(form) {
        body.classList.remove('active');
        modal.classList.remove('active');
        resultModal.classList.remove('active');
        form.reset();
    }

    function removeBodyPadding() {
        body.style.paddingRight = '';
    }

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            removeEventListener('scroll', showModalByScroll);
        }
    }

// Отправка формы 
    const message = {
        loading: '../images/form/spinner.svg',
        success: {
            title: 'Спасибо за заявку!',
            text: 'Мы свяжемся с вами в ближайшее время'
        },
        failure: {
            title: 'Что-то пошло не так...',
            text: 'Пожалуйста повторите попытку позже'
        }
    }

    postData(form);

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const loading = document.createElement('img');
            loading.src = message.loading;
            loading.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.append(loading);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            // request.setRequestHeader('Content-type', 'multipart/form-data')
            const formData = new FormData(form);

            request.send(formData);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    showResultModal(message.success.title, message.success.text);
                    loading.remove();
                } else {
                    showResultModal(message.failure.title, message.failure.text);
                    loading.remove();
                }
            })
        })
    }

    function showResultModal(title, text) {
        closeModal(form);

        document.querySelector('.modal-result .modal__window-title').textContent = title;
        document.querySelector('.modal-result .modal__window-text').textContent = text;

        resultModal.classList.add('active');        
    }

// Маска для номера телефона
    var getInputNumbersValue = function (input) {
        return input.value.replace(/\D/g, '');
    }

    var onPhonePaste = function (e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input);
        var pasted = e.clipboardData || window.clipboardData;
        if (pasted) {
            var pastedText = pasted.getData('Text');
            if (/\D/g.test(pastedText)) {
                input.value = inputNumbersValue;
                return;
            }
        }
    }

    var onPhoneInput = function (e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input),
            selectionStart = input.selectionStart,
            formattedInputValue = "";

        if (!inputNumbersValue) {
            return input.value = "";
        }

        if (input.value.length != selectionStart) {
            // Editing in the middle of input, not last symbol
            if (e.data && /\D/g.test(e.data)) {
                // Attempt to input non-numeric symbol
                input.value = inputNumbersValue;
            }
            return;
        }

        if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
            if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
            var firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
            formattedInputValue = input.value = firstSymbols + " ";
            if (inputNumbersValue.length > 1) {
                formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
            }
        } else {
            formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
        }
        input.value = formattedInputValue;
    }
    var onPhoneKeyDown = function (e) {
        var inputValue = e.target.value.replace(/\D/g, '');
        if (e.keyCode == 8 && inputValue.length == 1) {
            e.target.value = "";
        }
    }

    phoneInput.addEventListener('keydown', onPhoneKeyDown);
    phoneInput.addEventListener('input', onPhoneInput, false);
    phoneInput.addEventListener('paste', onPhonePaste, false);
    
// Маска для даты
    dateInput.forEach(item => {
        item.addEventListener('input', (event) => {
            let value = event.target.value;
        
            value = value.replace(/\D/g, '');
        
            if (value.length >= 3) {
                value = value.substring(0, 2) + '.' + value.substring(2);
            }
            if (value.length >= 6) {
                value = value.substring(0, 5) + '.' + value.substring(5, 9);
            }
        
            event.target.value = value;
        });
    })

// Слайдер
    new Swiper('.rooms__slider', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        autoplay: {
            delay: 4000,
        },
        loop: true,
        grabCursor: true,
        speed: 800
    });
    
    new Swiper('.reviews__slider', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        loop: false,
        grabCursor: true,
        speed: 800,
        spaceBetween: 30,
        slidesPerView: 2.5,
        breakpoints: {
            992: {
                slidesPerView: 2.5
            },
            576: {
                slidesPerView: 1.5
            },
            200: {
                slidesPerView: 1.1
            }
        }
    })
})

