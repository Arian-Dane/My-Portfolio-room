/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'audiowide': ['Audiowide', 'sans-serif'],
        'quantico': ['Quantico', 'sans-serif'],
        'ethnocentric': ['Ethnocentric', 'sans-serif'],
      },

      colors:{
        midnight: '#080818',
        neonPink:'#ff00ff',
        deepPurple: '#582688'
      }
    },
  },
  plugins: [],
}

