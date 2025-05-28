import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import * as RNLocalize from 'react-native-localize';

// Import translations
import en from './translations/en';
import ar from './translations/ar';

const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
} as const;

type LanguageKey = keyof typeof resources;

const getInitialLanguage = async (): Promise<LanguageKey> => {
  try {
    // First try to get the saved language preference
    const savedLanguage = await AsyncStorage.getItem('@user_preferred_language');
    if (savedLanguage && resources[savedLanguage as LanguageKey]) {
      return savedLanguage as LanguageKey;
    }

    // Fall back to device locale
    const locale = RNLocalize.getLocales()[0];
    const languageCode = locale?.languageCode || 'en';
    return (resources[languageCode as LanguageKey] ? languageCode : 'en') as LanguageKey;
  } catch (error) {
    console.error('Error getting initial language:', error);
    return 'en';
  }
};

export const setLanguageAndDirection = async (language: string): Promise<boolean> => {
  try {
    // Update i18n language
    await i18n.changeLanguage(language);

    // Get RTL status for the selected language
    const isRTL = ['ar', 'he', 'fa'].includes(language);

    // Only update and restart if RTL status is different
    if (I18nManager.isRTL !== isRTL) {
      // Force RTL/LTR layout
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);

      // Store language preference
      await AsyncStorage.setItem('@user_preferred_language', language);

      // Restart the app to apply RTL changes
      setTimeout(() => {
        RNRestart.restart();
      }, 100);
    } else {
      // Just store language preference if no RTL change needed
      await AsyncStorage.setItem('@user_preferred_language', language);
    }

    return isRTL;
  } catch (error) {
    console.error('Error setting language and direction:', error);
    return false;
  }
};

// Initialize i18next
const initI18n = async () => {
  const initialLanguage = await getInitialLanguage();
  
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: initialLanguage,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });

  return i18n;
};

export { initI18n };
export default i18n;
