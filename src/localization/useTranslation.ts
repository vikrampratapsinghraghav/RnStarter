import { useTranslation as useI18nTranslation } from 'react-i18next';
import { useLanguage } from './LanguageContext';

export const useTranslation = () => {
  const { t, i18n } = useI18nTranslation();
  const { currentLanguage, isRTL, setLanguage, availableLanguages } = useLanguage();

  // Ensure translations are loaded before returning
  const tWithFallback = (key: string, options?: any) => {
    try {
      return t(key, options);
    } catch (error) {
      console.warn(`Translation error for key "${key}":`, error);
      return key; // Fallback to key if translation fails
    }
  };

  return {
    t: tWithFallback,
    i18n,
    currentLanguage,
    isRTL,
    setLanguage,
    availableLanguages,
  };
};
