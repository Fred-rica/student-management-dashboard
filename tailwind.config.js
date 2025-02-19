/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#008F8F", 
        secondary: "#0A2139",
      },
    },
  },
  plugins: [],
};
