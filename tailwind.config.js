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
          DEFAULT: '#FFBA64',
          hover: '#FFA840',
          ink: '#1A0F00',
          text: '#B45309',
        },
        'accent-ink': '#1A0F00',
        'accent-text': '#B45309',
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
