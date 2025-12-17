import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import vn from './locales/vn.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      EN: { translation: en },
      VN: { translation: vn }
    },
    fallbackLng: 'EN',
    debug: true,
    interpolation: {
      escapeValue: false, 
    }
  });

export default i18n;