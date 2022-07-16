module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Custom configuration for menu: min 200px, expand extra space
        menu: "repeat(auto-fill, minmax(120px, 160px))",
        //21
        navBar: "1fr minmax(12em, 18em) 1fr",
        eventCardInfoRow: "3fr 1fr",
        mapWithResults: "minmax(20em, 1fr) 2fr",
      },
      gridAutoRows: {
        // Same as columns: min 200px, expand to fill extra space
        menu: "minmax(160px, 1fr)",
        events: "minmax(10em, 1fr)",
      },
    },
  },
  plugins: [],
};
