/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/App.js", "./public/index.html"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

