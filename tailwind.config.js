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
        sakura:
          "url('https://images.unsplash.com/photo-1680422997175-eda0528e4c67?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80')",
        sunrise:
          "url('https://images.unsplash.com/photo-1680562727022-158f17391a9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80')",
        pacific:
          "url('https://images.unsplash.com/photo-1511884642898-4c92249e20b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80')",
        snow: "url('/backgrounds/snow.jpg')",
        night: "url('/backgrounds/night.jpg')",
      },
      animation: {
        'spin-slow': 'spin 2.5s ease-out infinite',
      },
    },
  },
  plugins: [Myclass, require('tailwind-scrollbar-hide')],
};
