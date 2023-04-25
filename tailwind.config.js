/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
const Myclass = plugin(function ({ addUtilities }) {
  addUtilities({
    '.rotate-y-180': {
      transform: 'rotateY(-180deg)',
    },
    '.rotate-x-180': {
      transform: 'rotateX(180deg)',
    },
    '.preserve-3d': {
      transformStyle: 'preserve-3d',
    },
    '.perspective': {
      perspective: '3000px',
    },
    '.backface-hidden': {
      'backface-visibility': 'hidden',
    },
    '.backface-show': { 'backface-visibility': 'visible' },
  });
});

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        sakura: "url('/backgrounds/sakura.jpg')",
      },
      animation: {
        'spin-slow': 'spin 2.5s ease-out infinite',
      },
    },
  },
  plugins: [Myclass, require('tailwind-scrollbar-hide')],
};
