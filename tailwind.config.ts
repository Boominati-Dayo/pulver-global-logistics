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
        primary: '#1a365d',
        'primary-dark': '#0f2340',
        'primary-light': '#2c5282',
        accent: '#ea580c',
        'accent-light': '#f97316',
        white: '#ffffff',
      },
    },
  },
  plugins: [],
};

export default config;