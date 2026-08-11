/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        night: '#0B0D0F',
        ink: {
          DEFAULT: '#1B1035',
            50: '#F4F2ED',
            100: '#D5D9D1',
            400: '#7F8988',
            600: '#A9B0AB',
            900: '#F4F2ED',
        },
        coral: {
          DEFAULT: '#FF6B57',
          50: '#3B2222',
          100: '#63352F',
          500: '#FF6B57',
          600: '#FF8A6F',
        },
        amber: {
          DEFAULT: '#C7F36B',
          50: '#29321D',
          500: '#C7F36B',
          600: '#D9FF8B',
        },
        cream: {
          DEFAULT: '#101316',
          100: '#181C21',
          200: '#242A31',
        },
        emerald: {
          DEFAULT: '#6DDBA3',
          50: '#1E352A',
          600: '#8BE8B7',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(0, 0, 0, 0.24), 0 8px 24px -12px rgba(0, 0, 0, 0.48)',
        'card-hover': '0 4px 8px rgba(0, 0, 0, 0.3), 0 16px 32px -12px rgba(0, 0, 0, 0.62)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
