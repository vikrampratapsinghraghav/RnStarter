import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

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

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 