import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import config from 'src/config/app.config';
import en from './languages/en.json';
import vi from './languages/vi.json';

// Get language preference from localStorage or default to 'en'
let lang = config.isLanguage;
const savedConfig = localStorage.getItem('appConfig');
if (savedConfig) {
  try {
    const parsed = JSON.parse(savedConfig);
    if (parsed.isLanguage) lang = parsed.isLanguage;
  } catch {}
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      vi: { translation: vi },
    },
    lng: lang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;