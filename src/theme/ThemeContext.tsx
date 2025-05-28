import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useColorScheme, Platform, I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Theme {
  isDark: boolean;
  isRTL: boolean;
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
  };
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
}

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
  isRTL: I18nManager.isRTL,
  background: {
    primary: '#FFFFFF',
    secondary: '#F5F5F5',
    tertiary: '#E0E0E0',
  },
  text: {
    primary: '#000000',
    secondary: '#666666',
    tertiary: '#999999',
    inverse: '#FFFFFF',
  },
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    info: '#5856D6',
  },
};

const darkTheme: Theme = {
  ...lightTheme,
  isDark: true,
  background: {
    primary: '#000000',
    secondary: '#1C1C1E',
    tertiary: '#2C2C2E',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#EBEBF5',
    tertiary: '#EBEBF599',
    inverse: '#000000',
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
  const colorScheme = useColorScheme();

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
            const systemPreferredTheme = colorScheme === 'dark' ? darkTheme : lightTheme;
            setTheme(systemPreferredTheme);
            await saveThemePreference(systemPreferredTheme.isDark);
            return;
          }

          setTheme(preference.isDark ? darkTheme : lightTheme);
        } catch (parseError) {
          console.error('Failed to parse theme preference:', parseError);
          setTheme(colorScheme === 'dark' ? darkTheme : lightTheme);
        }
      } else {
        // No saved preference, use system preference
        setTheme(colorScheme === 'dark' ? darkTheme : lightTheme);
        await saveThemePreference(colorScheme === 'dark');
      }
    } catch (error) {
      console.error('Failed to load theme preference:', error);
      setTheme(lightTheme); // Fallback to light theme
    } finally {
      setIsLoading(false);
    }
  }, [colorScheme, saveThemePreference]);

  // Load theme preference when component mounts
  useEffect(() => {
    loadThemePreference();
  }, [loadThemePreference]);

  // Listen for system theme changes
  useEffect(() => {
    if (!isLoading) {
      loadThemePreference();
    }
  }, [colorScheme, loadThemePreference, isLoading]);

  const setThemeMode = useCallback(
    async (isDark: boolean) => {
      try {
        const newTheme = isDark ? darkTheme : lightTheme;
        setTheme(newTheme);
        await saveThemePreference(isDark);
      } catch (error) {
        console.error('Failed to set theme mode:', error);
      }
    },
    [saveThemePreference],
  );

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
