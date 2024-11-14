const colors = require('tailwindcss/colors');
const { createThemes } = require("tw-colors");

module.exports = {
    content: [
        "./src/**/*.{html,js}",
        'node_modules/preline/dist/*.js',
    ],

    darkMode: ['class'],

    theme: {
        container: {
            center: true,
            padding: "1rem"
        },
        fontFamily: {
            'poppins': ['Poppins', 'sans-serif'],
            'handrawn': ['Delicious Handrawn', 'cursive'],
        },
        extend: {
            colors: {
                primary: {
                    ...colors.orange,
                    "DEFAULT": '#F58220',
                },
            },
            spacing: {
                15: '60px',
                18: '72px'
            },
            zIndex: {
                '60': '60',
                '70': '70',
            },
        },
    },

    plugins: [
        require('preline/plugin'),
        // Xóa hoặc bình luận dòng này nếu không cần plugin custom
        // require('./custom.plugin'),
        createThemes({
            light: {
                default: colors.slate,
                primary: {
                    ...colors.orange,
                    "DEFAULT": '#F58220',
                },
            },
            dark: {
                default: {
                    '50': '#020617',
                    '100': '#0f172a',
                    '200': '#1e293b',
                    '300': '#334155',
                    '400': '#475569',
                    '500': '#64748b',
                    '600': '#94a3b8',
                    '700': '#cbd5e1',
                    '800': '#e2e8f0',
                    '900': '#f1f5f9',
                    '950': '#f8fafc'
                },
                primary: {
                    ...colors.orange,
                    "DEFAULT": '#F58220',
                },
            },
        }, {
            defaultTheme: 'light'
        })
    ],
};
