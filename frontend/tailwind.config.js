/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                red: '#FC4747',
                darkBlue: '#10141E',
                greyishBlue: '#5A698F',
                semiDarkBlue: '#161D2F',
                pureWhite: '#FFFFFF',
            },
            fontFamily: {
                sans: ['"Outfit"', 'sans-serif'],
            },
            fontSize: {
                'heading-l': '32px',
                'heading-m': '24px',
                'heading-s': '24px',
                'heading-xs': '18px',
                'body-m': '15px',
                'body-s': '13px',
            }
        },
    },
    plugins: [],
}
