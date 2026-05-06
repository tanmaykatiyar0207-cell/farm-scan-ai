import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Language support removed as per user request. 
// Defaulting to English only.

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: {} },
      hi: { translation: {} },
      kn: { translation: {} },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
