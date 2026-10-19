import React from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageToggle: React.FC = () => {
  const { i18n } = useTranslation();

  // Vérifie si la langue actuelle commence par 'fr' (ex: 'fr', 'fr-FR')
  const isFrench = i18n.language?.startsWith('fr');

  const toggleLanguage = () => {
    const nextLang = isFrench ? 'en' : 'fr';
    i18n.changeLanguage(nextLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-base-200 hover:bg-base-300 text-base-content border border-base-300 text-xs font-bold uppercase tracking-wider transition-all shadow-sm hover:shadow active:scale-95"
      title={isFrench ? "Switch to English" : "Passer en Français"}
      aria-label="Toggle language"
    >
      <span className="text-sm">🌐</span>
      <span>{isFrench ? 'EN' : 'FR'}</span>
    </button>
  );
};