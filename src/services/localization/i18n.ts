import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import XHR from "i18next-xhr-backend";
import localeRU from "./ru.json";
import localeUZ from "./uz.json";
i18n
  .use(Backend)
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ru: {
        translations: localeRU,
      },
      uz: {
        translation: localeUZ,
      },
    },
    fallbackLng: "ru",
    lng: "ru",
    debug: false,
    ns: ["translations"],
    defaultNS: "translations",
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
      wait: true,
    },
    appendNamespaceToMissingKey: true,
  });

export default i18n;
