/** @type {import('tailwindcss').Config} */
export default {
  content: ['./App.tsx', './main.tsx', './index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    backgroundImage: {
      river: "url('/src/assets/river.webp')",
      river2: "url('/src/assets/river2.webp')"
    }
  },
  plugins: []
};
