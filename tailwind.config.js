/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        h100: '#D9F0E9',
        h500: '#8DD2BD',
        h900: '#4C9C83',
        dark: '#202732',
        mid: '#5E6775',
        light: '#868D98',
        border: '#DFE0E5',
        inputbg: '#F8F9FE',
        bg: '#FCFDFF',
      },
    },
  },
  plugins: [],
}
