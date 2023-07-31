// const HttpBackend = require("i18next-http-backend");
// const ChainedBackend = require("i18next-chained-backend");
// const LanguageDetector = require("i18next-browser-languagedetector");
//
// const isBrowser = typeof window !== "undefined";
//
// const availableLanguages = [
//   { locale: "en", label: "English" },
//   { locale: "de", label: "Deutsch" },
//   { locale: "pt", label: "Português" },
//   { locale: "es", label: "Español" },
//   { locale: "ru", label: "Русский" },
//   { locale: "uk", label: "український" },
// ];
//
// const defaultSeparator = { thousand: ",", decimal: "." };
// const europeanSeparator = { thousand: ".", decimal: "," };
// const languageSeparators = new Map([
//   ["en", defaultSeparator],
//   ["de", europeanSeparator],
//   ["pt", defaultSeparator],
//   ["es", defaultSeparator],
//   ["ru", europeanSeparator],
//   ["uk", defaultSeparator],
// ]);
//
// module.exports = {
//   availableLanguages,
//   languageSeparators,
//   backend: {
//     backendOptions: [
//       { expirationTime: 720 * 60 * 1000 }, // 12 hours
//       { loadPath: "/locales/{{lng}}/common.json" },
//     ],
//     backends: isBrowser ? [HttpBackend] : [],
//   },
//   i18n: {
//     defaultLocale: "en",
//     locales: ["en", "de", "pt", "es", "ru", "uk"],
//   },
//   detection: {
//     order: ["cookie", "localStorage", "htmlTag"],
//     caches: ["cookie", "localStorage"],
//   },
//   reloadOnPrerender: process.env.NODE_ENV === "development",
//   ns: ["common"],
//   serializeConfig: false,
//   use: isBrowser ? [ChainedBackend, LanguageDetector] : [],
// };

/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "de", "pt", "es", "ru", "uk"],
    fallbackLng: {
      default: ["en"],
    },
  },
};
