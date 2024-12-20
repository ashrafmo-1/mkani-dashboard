import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enJSON from "./locales/en.json";
import arJSON from "./locales/ar.json";

i18n.use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enJSON },
      ar: { translation: arJSON },
    },
    fallbackLng: "en",
    lng: localStorage.getItem("i18nextLng") || "en",
    detection: {
      order: ["localStorage", "path", "navigator"],
      lookupFromPathIndex: 1,
      caches: ["localStorage"],
    },
    react: {
      useSuspense: false,
    },
  });

i18n.on("languageChanged", (lng) => {
  if (lng === "ar") {
    document.documentElement.setAttribute("dir", "rtl");
  } else {
    document.documentElement.setAttribute("dir", "ltr");
  }
  localStorage.setItem("i18nextLng", lng);
});

export default i18n;