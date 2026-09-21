/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gold-m': '#d4af37',
        'gold-light': '#f3e5ab',
        'laser-blue': '#00b4d8',
        'm-red': '#ff3344',
        'm-blue': '#0066b1',
      },
      fontFamily: {
        serif: ['Cinzel', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        syne: ['Syne', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
