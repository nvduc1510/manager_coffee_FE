/*
Template Name: Yum - Multipurpose Food Tailwind CSS Template
Version: 1.0
Author: coderthemes
Email: support@coderthemes.com
*/

import Swiper from "swiper";
import { Thumbs, FreeMode, Navigation } from "swiper";

function menuSwiper() {
    var swiper = new Swiper(".menu-swiper", {
        modules: [Thumbs, FreeMode, Navigation],
        spaceBetween: 12,
        freeMode: true,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },

        breakpoints: {
            320: {
                slidesPerView: 1,
            },

            768: {
                slidesPerView: 2,

            },
            1300: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        },
    });
}

menuSwiper();

//
function clientsSwiper() {
    const clientsNavSlider = new Swiper(".clients-testimonial-pagination", {
        loop: false,
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
        modules: [Thumbs, FreeMode],
    });

    const clientsThumbnailSlider = new Swiper(".clients-testimonial", {
        modules: [Thumbs, FreeMode],
        loop: true,
        spaceBetween: 24,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: clientsNavSlider,
        },
    });
}

clientsSwiper();