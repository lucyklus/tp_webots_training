/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
          'webotsGreen': '#02FC74',
          'webotsBlue': '#021727',
      }
    },
  },
  plugins: [],
}