//
import Swiper from "swiper";
import { Thumbs, Keyboard, FreeMode } from "swiper";

function cartSwiper() {
    const productNavSlider = new Swiper(".cart-swiper-pagination", {
        loop: false,
        keyboard: true,
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
        modules: [Thumbs, Keyboard, FreeMode],
    });

    const productThumbnailSlider = new Swiper(".cart-swiper", {
        modules: [Thumbs, Keyboard, FreeMode],
        keyboard: true,
        loop: true,
        spaceBetween: 24,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: productNavSlider,
        },
    });
}

cartSwiper();