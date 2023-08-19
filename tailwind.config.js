/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-backdrop":
          "linear-gradient(to top right, #36393C, #141727, #141727, #141727, #141727, #141727)",
      },
      colors: {
        "gradient-color":
          "linear-gradient(to left right, #6C82CF, #7682CD, #8182C9, #8B83C6, #8F83C4)",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
