// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }




/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'ss':'320px',

      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md':	'768px',

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1580px',
      // => @media (min-width: 1280px) { ... }

      '2xl':'1536px'
    },
  },
  plugins: [],
}