"use strict";

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
})