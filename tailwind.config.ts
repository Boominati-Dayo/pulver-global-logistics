import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#2c00cc',
        'primary-dark': '#160066',
        'primary-light': '#5f33ff',
        accent: '#84cc16',
        'accent-light': '#a3e635',
        white: '#ffffff',
        'dark-amethyst': {
          50: '#ebe5ff',
          100: '#d7ccff',
          200: '#af99ff',
          300: '#8766ff',
          400: '#5f33ff',
          500: '#3700ff',
          600: '#2c00cc',
          700: '#210099',
          800: '#160066',
          900: '#0b0033',
          950: '#080024',
        },
      },
    },
  },
  plugins: [],
};

export default config;