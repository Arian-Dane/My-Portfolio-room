/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Orbitron', 'sans-serif'],
        'body': ['Roboto', 'sans-serif'],
        'sans': ['Roboto', 'sans-serif'],
        'audiowide': ['Audiowide', 'sans-serif'],
        'capriola': ['Capriola', 'sans-serif'],
        'quantico': ['Quantico', 'sans-serif'],
        'orbitron': ['Orbitron', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'ethnocentric': ['Ethnocentric', 'sans-serif'],
      },

      colors: {
        midnight: '#080818',
        neonPink: '#ff00ff',
        deepPurple: '#160925',
        mediumPurple: '#1b0b2f',
        primary: 'hsl(var(--neon-pink))',
        foreground: 'hsl(var(--foreground))',
        background: '#03030a',
        accent: '#5d3cff',
        'primary-foreground': '#ffffff',
      }
    },
  },
  plugins: [],
}

