/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    colors: {
      'green': '#02FC74',
      'blue': '#021727'
    },
    extend: {
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

