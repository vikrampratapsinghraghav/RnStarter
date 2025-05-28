import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme, I18nManager } from 'react-native';

export interface Theme {
  isDark: boolean;
  isRTL: boolean;
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

const lightTheme: Theme = {
  isDark: false,
  isRTL: I18nManager.isRTL,
  background: {
    default: '#FFFFFF',
    paper: '#F5F5F5',
    elevated: '#E0E0E0',
  },
  text: {
    primary: '#000000',
    secondary: '#666666',
    disabled: '#999999',
    inverse: '#FFFFFF',
  },
  primary: {
    main: '#007AFF',
    light: '#4DA3FF',
    dark: '#0055B3',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#5856D6',
    light: '#7A79E0',
    dark: '#3E3D94',
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#34C759',
    light: '#5FD37E',
    dark: '#248F40',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#FF9500',
    light: '#FFAA33',
    dark: '#CC7700',
    contrastText: '#000000',
  },
  error: {
    main: '#FF3B30',
    light: '#FF6961',
    dark: '#CC2F26',
    contrastText: '#FFFFFF',
  },
  typography: {
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
    default: '#000000',
    paper: '#1C1C1E',
    elevated: '#2C2C2E',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#EBEBF5',
    disabled: '#EBEBF599',
    inverse: '#000000',
  },
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const defaultContextValue: ThemeContextType = {
  theme: lightTheme,
  toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultContextValue);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>(colorScheme === 'dark' ? darkTheme : lightTheme);

  useEffect(() => {
    setTheme(colorScheme === 'dark' ? darkTheme : lightTheme);
  }, [colorScheme]);

  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme.isDark ? lightTheme : darkTheme));
  };

  const value = {
    theme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    console.error('useTheme must be used within a ThemeProvider');
    return defaultContextValue; // Provide fallback instead of throwing
  }
  return context;
};
