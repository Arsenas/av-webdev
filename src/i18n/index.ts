// src/i18n/index.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Importuojam JSON vertimus
import translationEN from "./en/translation.json";
import translationLT from "./lt/translation.json";
import translationRU from "./ru/translation.json";

const resources = {
  en: { translation: translationEN },
  lt: { translation: translationLT },
  ru: { translation: translationRU },
};

let savedLanguage = "en";
try { savedLanguage = localStorage.getItem("i18nLang") || "en"; } catch { /* Use English when storage is blocked. */ }

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
