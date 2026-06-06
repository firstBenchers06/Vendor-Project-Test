/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '4.5': '1.125rem',
      },
      colors: {
        indigo: {
          150: '#e0e7ff',
        },
        slate: {
          350: '#cbd5e1',
        }
      }
    },
  },
  plugins: [],
}
