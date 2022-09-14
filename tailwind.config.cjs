/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        spinner: `url(./src/assets/spinner.gif)`,
      },
    },
  },
  plugins: [],
};
