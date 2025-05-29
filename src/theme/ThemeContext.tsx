import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { storage } from '@utils/storage';
import { lightThemes, darkThemes, ThemeVariant } from './colors';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface Theme {
  isDark: boolean;
  variant: ThemeVariant;
  background: {
    default: string;
    paper: string;
    elevated: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
    inverse: string;
  };
  primary: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  secondary: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  error: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  warning: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  success: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  typography: {
    fontFamily: {
      regular: string;
      medium: string;
      bold: string;
    };
    fontSize: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
      xxxl: number;
    };
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
}

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  themeMode: ThemeMode;
  themeVariant: ThemeVariant;
  setThemeMode: (mode: ThemeMode) => void;
  setThemeVariant: (variant: ThemeVariant) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
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
};

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');
  const [themeVariant, setThemeVariant] = useState<ThemeVariant>('default');

  // Load saved theme settings
  useEffect(() => {
    const loadThemeSettings = async () => {
      try {
        const savedThemeMode = await storage.getItem('theme-mode') as ThemeMode | null;
        const savedThemeVariant = await storage.getItem('theme-variant') as ThemeVariant | null;
        
        if (savedThemeMode) {
          setThemeMode(savedThemeMode);
        }
        if (savedThemeVariant) {
          setThemeVariant(savedThemeVariant);
        }
      } catch (error) {
        console.error('Error loading theme settings:', error);
      }
    };

    loadThemeSettings();
  }, []);

  // Save theme settings when they change
  useEffect(() => {
    const saveThemeSettings = async () => {
      try {
        await storage.setItem('theme-mode', themeMode);
        await storage.setItem('theme-variant', themeVariant);
      } catch (error) {
        console.error('Error saving theme settings:', error);
      }
    };

    saveThemeSettings();
  }, [themeMode, themeVariant]);

  const isDark = themeMode === 'dark' || (themeMode === 'system' && systemColorScheme === 'dark');
  const colors = isDark ? darkThemes[themeVariant] : lightThemes[themeVariant];

  const theme: Theme = {
    isDark,
    variant: themeVariant,
    ...colors,
    typography,
    spacing,
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        isDark, 
        themeMode, 
        themeVariant,
        setThemeMode,
        setThemeVariant,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
