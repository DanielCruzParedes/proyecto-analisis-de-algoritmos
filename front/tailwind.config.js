/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        clash: ["clash", "sans-serif"],
        rpg: ["rpg", "sans-serif"]
      },
    },
  },
  plugins: [],
};
