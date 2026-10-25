/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0A0A0B',
          surface: '#121214',
          subtle: '#18181B',
          border: '#27272A',
        },
        light: {
          DEFAULT: '#FAF8F5',
          surface: '#F4F0EA',
          subtle: '#EBE5DC',
          border: '#E2DBD0',
        },
        accent: {
          DEFAULT: '#F43F5E',
          hover: '#E11D48',
          muted: 'rgba(244, 63, 94, 0.15)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.2em',
      },
    },
  },
  plugins: [],
};
