/** @type {import('tailwindcss').Config} */
export default {
  content: ['./App.tsx', './main.tsx', './index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    backgroundImage: {
      river: "url('./river.webp')"
    }
  },
  plugins: []
};
