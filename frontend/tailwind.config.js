/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#152A2E',
          50: '#EAF0EF',
          100: '#D2DFDE',
          200: '#A6BFBE',
          300: '#78A09E',
          400: '#4E7F7E',
          500: '#2F5C5C',
          600: '#1F4344',
          700: '#183638',
          800: '#152A2E',
          900: '#0E1D20',
          950: '#0A1416',
        },
        paper: {
          DEFAULT: '#F1F4F1',
          50: '#FCFDFC',
          100: '#F6F8F6',
          200: '#F1F4F1',
        },
        compass: {
          DEFAULT: '#E3A23D',
          50: '#FCF3E2',
          100: '#F8E6C4',
          400: '#EBB05E',
          500: '#E3A23D',
          600: '#C4842A',
          700: '#9C6820',
        },
        coral: {
          DEFAULT: '#D9614F',
          500: '#D9614F',
          600: '#B84B3B',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      backgroundImage: {
        'trail-dots': 'radial-gradient(circle, #A6BFBE 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
