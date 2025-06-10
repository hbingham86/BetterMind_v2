/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,jsx,ts,tsx}', , './components/**/*.{js,jsx,ts,tsx}'],
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            colors: {
                primary: '#CCCCCC',
                secondary: '#3D9D9D',
                accent: '#9597A6',
            },
        },
    },
    plugins: [],
};
