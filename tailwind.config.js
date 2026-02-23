/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./main.js",
    "./src/**/*.{html,js,css}",
    "!./node_modules/**/*",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
