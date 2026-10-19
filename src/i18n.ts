import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importation des fichiers JSON de traduction
import translationEN from './locales/en.json';
import translationFR from './locales/fr.json';

// Définition des ressources
export const defaultNS = 'translation';
export const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'fr'],
    
    // Détection de la langue
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false, // Inutile avec React qui gère déjà le XSS
    },
  });

export default i18n;