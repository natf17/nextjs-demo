module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        // Custom configuration for menu: min 200px, expand extra space
        'menu': 'repeat(auto-fill, minmax(200px, 1fr))',

        'navBar': '1fr 21em 1fr'
      },
      gridAutoRows: {
        // Same as columns: min 200px, expand to fill extra space
        'menu': 'minmax(200px, 1fr)'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
