import { useTranslation as useI18nTranslation } from 'react-i18next';
import { useLanguage } from './LanguageContext';

export const useTranslation = () => {
  const { t, i18n } = useI18nTranslation();
  const { currentLanguage, isRTL, setLanguage, availableLanguages } = useLanguage();

  return {
    t,
    i18n,
    currentLanguage,
    isRTL,
    setLanguage,
    availableLanguages,
  };
}; 