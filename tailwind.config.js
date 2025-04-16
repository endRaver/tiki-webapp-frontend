/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: {
          100: '#0A68FF',
          200: '#0B74E5',
          300: '#0D5CB6',
          400: '#003EA1',
        },
        success: {
          100: '#00AB56',
        },
        neutral: {
          100: '#242424',
          200: '#27272A',
          300: '#333333',
          400: '#38383D',
          500: '#4A4A4A',
          600: '#808089',
        },
        rating: {
          100: '#FDD835',
          200: '#FFC400',
        },
        danger: {
          100: '#FF424E',
        },
      },
      backgroundColor: {
        section: '#F5F5FA',
      },
    },
  },
  plugins: [require("daisyui")],
} 