"use strict";
window.addEventListener('DOMContentLoaded', () => {

    const burgerMenu = document.querySelector('.burger-menu'),
          menuList = document.querySelector('.header .menu'),
          body = document.querySelector('body');
    
    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        menuList.classList.toggle('active');
        body.classList.toggle('active');
    })
    console.log(burgerMenu, menuList)

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

