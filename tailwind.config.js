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
      },

      colors: {
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

