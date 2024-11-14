/*
Template Name: Yum - Multipurpose Food Tailwind CSS Template
Version: 1.0
Author: coderthemes
Email: support@coderthemes.com
*/

import { createIcons, icons } from "lucide";
import 'simplebar';

import 'preline';

function init() {

    createIcons({ icons })

    // Topbar Sticky
    function initStickyNav() {
        function windowScroll() {
            const navbar = document.getElementById("navbar");
            if (navbar) {
                if (
                    document.body.scrollTop >= 75 ||
                    document.documentElement.scrollTop >= 75
                ) {
                    navbar.classList.add("nav-sticky");
                } else {
                    navbar.classList.remove("nav-sticky");
                }
            }
        }

        window.addEventListener("scroll", (ev) => {
            ev.preventDefault();
            windowScroll();
        });
    }


    // Topnav Active Menu
    function initNavLinkActive() {

        // Menu Active
        const pageUrl = window.location.href.split(/[?#]/)[0];
        const navbarLinks = Array.from(document.querySelectorAll('.menu a'));

        navbarLinks.forEach((link) => {
            if (link.href === pageUrl) {
                link.classList.add('active');

                const parentMenu = link.parentElement.parentElement.parentElement;
                if (parentMenu?.classList.contains('menu-item')) {
                    const dropdownElement = parentMenu.querySelector('.hs-dropdown-toggle');
                    dropdownElement?.classList.add('active');
                }

                const parentParentMenu = link.parentElement.parentElement.parentElement.parentElement.parentElement;
                if (parentParentMenu?.classList.contains('menu-item')) {
                    const dropdownElement = parentParentMenu.querySelector('.hs-dropdown-toggle');
                    dropdownElement?.classList.add('active');
                }
            }
        });
    }

    function initAdminLinkActive() {
        var self = this;
        var pageUrl = window.location.href.split(/[?#]/)[0];
        document.querySelectorAll('ul.admin-menu .menu-item a').forEach((element) => {
            if (element.href === pageUrl) {
                element.classList.add('active');

                let parentMenu = element.parentElement.parentElement.parentElement.parentElement;
                if (parentMenu && parentMenu.classList.contains('menu-item')) {
                    const collapseElement = parentMenu.querySelector('[data-hs-collapse]');

                    if (collapseElement) {
                        collapseElement.classList.add('active')
                        const nextE = collapseElement.nextElementSibling;
                        if (nextE) {
                            HSCollapse.show(nextE)
                        }
                    }

                }
            }
        })

        // Hide other collapse when click on collapse
        const allCollapse = document.querySelectorAll('ul.admin-menu .hs-collapse');
        allCollapse.forEach((element) => {
            element.addEventListener('open.hs.collapse', (evt) => {
                allCollapse.forEach((sElement) => {
                    if (sElement !== evt.target) {
                        HSCollapse.hide(sElement);
                    }
                })
            })
        })
    }

    // Preloader
    function initPrealoader() {
        window.onload = function loader() {
            setTimeout(() => {
                if (document.getElementById('preloader')) {
                    document.getElementById('preloader').style.visibility = 'hidden';
                    document.getElementById('preloader').style.opacity = '0';
                }
            }, 500);
        }
    }

    // Back To Top
    function initBacktoTop() {
        const mybutton = document.querySelector('[data-toggle="back-to-top"]');

        window.addEventListener("scroll", function () {
            if (mybutton) {
                if (window.pageYOffset > 72) {
                    mybutton.classList.remove("opacity-0");
                    mybutton.classList.add("h-8");
                    mybutton.classList.remove("h-0");
                    mybutton.classList.remove("translate-y-5");
                } else {
                    mybutton.classList.add("opacity-0");
                    mybutton.classList.remove("h-8");
                    mybutton.classList.add("h-0");
                    mybutton.classList.add("translate-y-5");
                }
            }
        });

        if (mybutton) {
            mybutton.addEventListener("click", function (e) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
        }
    }

    function initPassword() {

        document.querySelectorAll('[data-x-password]').forEach((element) => {
            const password = element.querySelector('.form-password');
            const passwordEyeOn = element.querySelector('.password-eye-on');
            const passwordEyeOff = element.querySelector('.password-eye-off');

            if (password && passwordEyeOn && passwordEyeOff) {
                passwordEyeOff.classList.add('hidden');
                passwordEyeOn.addEventListener('click', ev => {
                    passwordEyeOn.classList.add('hidden');
                    passwordEyeOff.classList.remove('hidden');
                    password.type = 'text';
                });
                passwordEyeOff.addEventListener('click', ev => {
                    passwordEyeOff.classList.add('hidden');
                    passwordEyeOn.classList.remove('hidden');
                    password.type = 'password';
                });
            }
        })

    }

    // Topbar Fullscreen Button
    function initfullScreenListener() {
        var self = this;
        var fullScreenBtn = document.querySelector('[data-toggle="fullscreen"]');

        if (fullScreenBtn) {
            fullScreenBtn.addEventListener('click', function (e) {
                e.preventDefault();
                document.body.classList.toggle('fullscreen-enable')
                if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
                    if (document.documentElement.requestFullscreen) {
                        document.documentElement.requestFullscreen();
                    } else if (document.documentElement.mozRequestFullScreen) {
                        document.documentElement.mozRequestFullScreen();
                    } else if (document.documentElement.webkitRequestFullscreen) {
                        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                    }
                } else {
                    if (document.cancelFullScreen) {
                        document.cancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    }
                }
            });
        }
    }

    initStickyNav();
    initNavLinkActive();
    initAdminLinkActive();
    initBacktoTop();
    initPrealoader();
    initPassword();
    initfullScreenListener();
}

init();
