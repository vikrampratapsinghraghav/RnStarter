import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';
import { setLanguageAndDirection } from './i18n';
import { AppState } from 'react-native';

interface LanguageContextType {
  currentLanguage: string;
  isRTL: boolean;
  setLanguage: (language: string) => Promise<void>;
  availableLanguages: { code: string; name: string }[];
}

const availableLanguages = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'العربية' },
];

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: 'en',
  isRTL: false,
  setLanguage: async () => {},
  availableLanguages,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isRTL, setIsRTL] = useState(false);

  const detectDeviceLanguage = () => {
    // Get the device locale
    const locale = RNLocalize.getLocales()[0];
    const languageCode = locale?.languageCode || 'en';

    // Check if the language is supported
    const isSupported = availableLanguages.some(lang => lang.code === languageCode);
    return isSupported ? languageCode : 'en';
  };

  const handleLocaleChange = async () => {
    // Only update if there's no saved preference
    const savedLanguage = await AsyncStorage.getItem('@user_preferred_language');
    if (!savedLanguage) {
      const deviceLanguage = detectDeviceLanguage();
      const rtl = await setLanguageAndDirection(deviceLanguage);
      setCurrentLanguage(deviceLanguage);
      setIsRTL(rtl);
    }
  };

  useEffect(() => {
    // Load saved language or detect device language
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('@user_preferred_language');

        if (savedLanguage) {
          const rtl = await setLanguageAndDirection(savedLanguage);
          setCurrentLanguage(savedLanguage);
          setIsRTL(rtl);
        } else {
          // Get device language
          const deviceLanguage = detectDeviceLanguage();
          const rtl = await setLanguageAndDirection(deviceLanguage);
          setCurrentLanguage(deviceLanguage);
          setIsRTL(rtl);
        }
      } catch (error) {
        console.error('Error loading language:', error);
        // Fallback to English
        const rtl = await setLanguageAndDirection('en');
        setCurrentLanguage('en');
        setIsRTL(rtl);
      }
    };

    loadLanguage();

    // Subscribe to app state changes
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        handleLocaleChange();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const setLanguage = async (language: string) => {
    try {
      const rtl = await setLanguageAndDirection(language);
      setCurrentLanguage(language);
      setIsRTL(rtl);
      await AsyncStorage.setItem('@user_preferred_language', language);
    } catch (error) {
      console.error('Error setting language:', error);
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        isRTL,
        setLanguage,
        availableLanguages,
      }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
