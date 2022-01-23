import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import localeRU from "./locales/ru.json";
import localeUZ from "./locales/uz.json";

const resources = {
  ru: {
    translation: localeRU,
  },
  uz: {
    translation: localeUZ,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "ru",
  lng: "ru",
  debug: false,
  ns: ["translation"],
  defaultNS: "translation",
  interpolation: {
    escapeValue: false,
  },

  react: {
    useSuspense: false,
    wait: true,
  },
});

export default i18n;
