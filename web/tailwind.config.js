/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        galaxy: "url('/galaxy.png')",
        'nlw-gradient':
          'linear-gradient(to right, #9572FC 0%, #43E7AD 50%, #E1D55D 100%)',
        'game-gradient':
          'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)',
      },
      boxShadow: {
        'tooltip':
          'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      screens: { 
        'home-xs': { max: '20rem' },
        'game-xs': { max: '25.125rem' },
        sm: { max: '32.5rem' },
        tiny: { max: '43.125rem' },
        lg: { max: '49.375rem' },
        xl: { max: '96rem', min: '49.3125rem' },
        '2xl': { max: '92.375rem', min: '95.9375rem' },
        '3xl': { max: '96.375rem', }
      }
    },
  },
  plugins: [require('tailwind-scrollbar'), require('tailwindcss-radix')()],
}
