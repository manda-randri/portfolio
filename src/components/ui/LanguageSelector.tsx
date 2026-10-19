import React, { useState } from 'react';

// Fonction helper pour lire la langue sauvegardée dans les cookies
const getInitialLanguage = (): 'EN' | 'FR' => {
  if (typeof document === 'undefined') return 'EN';
  const match = document.cookie.match(/(?:^|; )googtrans=([^;]*)/);
  if (match && match[1].includes('/fr')) {
    return 'FR';
  }
  return 'EN';
};

export const LanguageSelector: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<'EN' | 'FR'>(getInitialLanguage);

  const changeLanguage = (langCode: 'en' | 'fr') => {
    const googleSelect = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    
    if (googleSelect) {
      googleSelect.value = langCode;
      googleSelect.dispatchEvent(new Event('change'));
      setCurrentLang(langCode === 'en' ? 'EN' : 'FR');
    } else {
      // Si l'élément Google n'est pas encore prêt, on force via le cookie de traduction
      document.cookie = `googtrans=/en/${langCode}; path=/`;
      document.cookie = `googtrans=/en/${langCode}; domain=.${window.location.hostname}; path=/`;
      window.location.reload();
    }
  };

  return (
    <div className="join border border-base-300 rounded-btn p-0.5 bg-base-200/50">
      <button
        type="button"
        onClick={() => changeLanguage('en')}
        className={`btn btn-xs join-item ${
          currentLang === 'EN' 
            ? 'btn-primary font-bold' 
            : 'btn-ghost text-base-content/70 hover:text-base-content'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => changeLanguage('fr')}
        className={`btn btn-xs join-item ${
          currentLang === 'FR' 
            ? 'btn-primary font-bold' 
            : 'btn-ghost text-base-content/70 hover:text-base-content'
        }`}
        aria-label="Passer en Français"
      >
        FR
      </button>
    </div>
  );
};