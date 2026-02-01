import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslations from './locales/en.json';
import arTranslations from './locales/ar.json';
import frTranslations from './locales/fr.json';
import deTranslations from './locales/de.json';
import swTranslations from './locales/sw.json';

// RTL languages
const rtlLanguages = ['ar'];

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: enTranslations },
            ar: { translation: arTranslations },
            fr: { translation: frTranslations },
            de: { translation: deTranslations },
            sw: { translation: swTranslations }
        },
        fallbackLng: 'en',
        supportedLngs: ['en', 'ar', 'fr', 'de', 'sw'],
        lng: localStorage.getItem('language') || 'en',
        debug: false,

        interpolation: {
            escapeValue: false, // React escapes by default
        },
    });

// Handle RTL direction change
i18n.on('languageChanged', (lng) => {
    const dir = rtlLanguages.includes(lng) ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lng);
    localStorage.setItem('language', lng);
});

// Set initial direction
const currentLang = i18n.language;
const dir = rtlLanguages.includes(currentLang) ? 'rtl' : 'ltr';
document.documentElement.setAttribute('dir', dir);
document.documentElement.setAttribute('lang', currentLang);

export default i18n;

