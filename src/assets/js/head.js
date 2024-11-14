/*
Template Name: Yum - Multipurpose Food Tailwind CSS Template
Version: 1.0
Author: coderthemes
Email: support@coderthemes.com
*/

import '../css/style.css'
import '../css/icons.css'

class ThemeCustomizer {

    theme = "light";

    init() {
        this.html = document.getElementsByTagName('html')[0];
        const config = localStorage.getItem('__FOOD_CONFIG__');
        if (config) {
            const parsed = JSON.parse(config);
            this.theme = parsed['theme'];
        }
        if (this.theme === 'dark') {
            this.html.classList.add('dark')
        }
        this.onThemeChange();
        window.addEventListener('DOMContentLoaded', ()=>{
            this.after();
        });
    }

    onThemeChange = () => {
        if (this.theme === 'dark') {
            this.html.classList.add('dark')
        } else {
            this.html.classList.remove('dark')
        }

        if (this.lightTheme && this.darkTheme) {
            if (this.theme === 'light') {
                this.lightTheme.classList.remove('hidden');
                this.darkTheme.classList.add('hidden');
            } else {
                this.darkTheme.classList.remove('hidden');
                this.lightTheme.classList.add('hidden');
            }
        }

        localStorage.setItem('__FOOD_CONFIG__', JSON.stringify({
            theme: this.theme
        }))
    }

    after() {
        this.lightTheme = document.getElementById('light-theme');
        this.darkTheme = document.getElementById('dark-theme');

        if (this.lightTheme && this.darkTheme) {
            this.lightTheme.addEventListener('click', (e) => {
                this.theme = 'dark';
                this.onThemeChange();
            });
            this.darkTheme.addEventListener('click', (e) => {
                this.theme = 'light';
                this.onThemeChange();
            })
        }
        this.onThemeChange();
    }
}

new ThemeCustomizer().init();
