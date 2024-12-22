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
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    react: {
      useSuspense: true,
    },
  })
  .then(() => {
    // تعيين اتجاه النص عند التهيئة
    const currentLng = i18n.language || "en"; // اللغة الحالية
    const isRTL = currentLng === "ar";
    document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", currentLng);
  });

i18n.on("languageChanged", (lng) => {
  const isRTL = lng === "ar";
  document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
  document.documentElement.setAttribute("lang", lng);

  if (typeof localStorage !== "undefined") {
    localStorage.setItem("i18nextLng", lng);
  }
});

i18n.on("failedLoading", (lng, ns, msg) => {
  console.error(`Failed to load translation for ${lng}/${ns}: ${msg}`);
});

export default i18n;