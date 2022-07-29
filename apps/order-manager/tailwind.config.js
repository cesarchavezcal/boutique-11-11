/** @type {import('tailwindcss').Config} */
const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');

module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    colors: {
      apricot: {
        light: '#f4adae',
        DEFAULT: '#ec8283',
        dark: '#cb3738',
      },
      white: '#fff',
      black: {
        DEFAULT: '#1d1d1d',
        light: '#696969',
      },
      danger: '#dc2626',
      warning: '#f59e0b',
      focus: '#2563eb',
      success: '#22c55e',
      background: '#faf3f7',
    },
    extend: {
      gridTemplateAreas: 'none',
    },
  },
  plugins: [],
};
