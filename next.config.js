module.exports = {
  reactStrictMode: true,

  output: "standalone",

  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
  },

  images: {
    domains: [process.env.IMG_DOMAIN],
  },
};
