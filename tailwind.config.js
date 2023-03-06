/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FDF4EC",
        "linear-1": "#F64C18",
        "linear-2": "#EF9045",
        "gray-1": "#BDBDBD",
        "gray-2": "#757575",
        "gray-3": "#484848",
        "input-stroke": "",
        "secondary-green": "#0E4550",

        primary: {
          100: "#EF9045",
          200: "#F19B58",
          300: "#F2A66A",
          400: "#F4B17D",
          500: "#F5BC8F",
          600: "#F7C8A2",
          700: "#F9D3B5",
          800: "#FADEC7",
          900: "#FCE9DA",
        },
      },
    },
  },
  plugins: [],
};
