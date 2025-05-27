import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useColorScheme, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Theme } from './types';

const THEME_STORAGE_KEY = '@theme_preference';
const THEME_STORAGE_VERSION = '1.0';

interface ThemePreference {
  version: string;
  isDark: boolean;
  timestamp: number;
}

interface ThemeContextType {
  theme: Theme;
  isLoading: boolean;
  toggleTheme: () => Promise<void>;
  setThemeMode: (isDark: boolean) => Promise<void>;
}

const lightTheme: Theme = {
  isDark: false,
  background: {
    default: '#FFFFFF',
    paper: '#F5F5F5',
    elevated: '#FFFFFF',
  },
  text: {
    primary: '#212121',
    secondary: '#616161',
    disabled: '#9E9E9E',
    inverse: '#FFFFFF',
  },
  primary: {
    main: '#1976D2',
    light: '#42A5F5',
    dark: '#1565C0',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#9C27B0',
    light: '#BA68C8',
    dark: '#7B1FA2',
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#D32F2F',
    light: '#EF5350',
    dark: '#C62828',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#ED6C02',
    light: '#FF9800',
    dark: '#E65100',
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#2E7D32',
    light: '#4CAF50',
    dark: '#1B5E20',
    contrastText: '#FFFFFF',
  },
  grey: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  typography: {
    fontFamily: {
      regular: Platform.select({ ios: 'System', android: 'Roboto' }) || 'System',
      medium: Platform.select({ ios: 'System', android: 'Roboto' }) || 'System',
      bold: Platform.select({ ios: 'System', android: 'Roboto-Bold' }) || 'System',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 32,
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
};

const darkTheme: Theme = {
  ...lightTheme,
  isDark: true,
  background: {
    default: '#121212',
    paper: '#1E1E1E',
    elevated: '#2C2C2C',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#BDBDBD',
    disabled: '#757575',
    inverse: '#212121',
  },
};

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  isLoading: true,
  toggleTheme: async () => {},
  setThemeMode: async () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(lightTheme);
  const [isLoading, setIsLoading] = useState(true);
  const systemColorScheme = useColorScheme();

  const saveThemePreference = useCallback(async (isDark: boolean) => {
    try {
      const preference: ThemePreference = {
        version: THEME_STORAGE_VERSION,
        isDark,
        timestamp: Date.now(),
      };
      await AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(preference));
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  }, []);

  const loadThemePreference = useCallback(async () => {
    try {
      const savedPreference = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      
      if (savedPreference) {
        try {
          const preference: ThemePreference = JSON.parse(savedPreference);
          
          // If the stored version doesn't match, fall back to system preference
          if (preference.version !== THEME_STORAGE_VERSION) {
            const systemPreferredTheme = systemColorScheme === 'dark' ? darkTheme : lightTheme;
            setTheme(systemPreferredTheme);
            await saveThemePreference(systemPreferredTheme.isDark);
            return;
          }
          
          setTheme(preference.isDark ? darkTheme : lightTheme);
        } catch (parseError) {
          console.error('Failed to parse theme preference:', parseError);
          setTheme(systemColorScheme === 'dark' ? darkTheme : lightTheme);
        }
      } else {
        // No saved preference, use system preference
        setTheme(systemColorScheme === 'dark' ? darkTheme : lightTheme);
        await saveThemePreference(systemColorScheme === 'dark');
      }
    } catch (error) {
      console.error('Failed to load theme preference:', error);
      setTheme(lightTheme); // Fallback to light theme
    } finally {
      setIsLoading(false);
    }
  }, [systemColorScheme, saveThemePreference]);

  // Load theme preference when component mounts
  useEffect(() => {
    loadThemePreference();
  }, [loadThemePreference]);

  // Listen for system theme changes
  useEffect(() => {
    if (!isLoading) {
      loadThemePreference();
    }
  }, [systemColorScheme, loadThemePreference, isLoading]);

  const setThemeMode = useCallback(async (isDark: boolean) => {
    try {
      const newTheme = isDark ? darkTheme : lightTheme;
      setTheme(newTheme);
      await saveThemePreference(isDark);
    } catch (error) {
      console.error('Failed to set theme mode:', error);
    }
  }, [saveThemePreference]);

  const toggleTheme = useCallback(async () => {
    await setThemeMode(!theme.isDark);
  }, [theme.isDark, setThemeMode]);

  return (
    <ThemeContext.Provider value={{ theme, isLoading, toggleTheme, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 