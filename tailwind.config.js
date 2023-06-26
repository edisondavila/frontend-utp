const tailwindcss = require('tailwindcss')
module.exports = {
  purge: ['./src/components/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}', './src/*.{js,jsx,ts,tsx}'], // Actualiza las extensiones de los archivos aquí
  darkMode: false,
  theme: {
    extend: {}
  },
  variants: {},
  plugins: [
    tailwindcss
  ]
}
