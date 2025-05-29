/**
 * Color palettes configuration for the application.
 * Supports multiple themes (Default, Nature, Ocean) with both light and dark variants.
 *
 * @example
 * ```tsx
 * import { colors } from '../theme/colors';
 *
 * const styles = StyleSheet.create({
 *   container: {
 *     backgroundColor: colors.background.default,
 *   },
 *   text: {
 *     color: colors.text.primary,
 *   },
 * });
 * ```
 */

export type ThemeVariant = 'default' | 'nature' | 'ocean';

/** Base color palettes for different themes */
const palettes = {
  default: {
    primary: {
      main: '#007AFF',
      light: '#4DA3FF',
      dark: '#0055B3',
    },
    secondary: {
      main: '#5856D6',
      light: '#7A79E0',
      dark: '#3E3D94',
    },
  },
  nature: {
    primary: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
    },
    secondary: {
      main: '#FFA726',
      light: '#FFB74D',
      dark: '#F57C00',
    },
  },
  ocean: {
    primary: {
      main: '#0288D1',
      light: '#4FC3F7',
      dark: '#01579B',
    },
    secondary: {
      main: '#26A69A',
      light: '#4DB6AC',
      dark: '#00796B',
    },
  },
  common: {
    error: {
      main: '#FF3B30',
      light: '#FF6961',
      dark: '#CC2F26',
    },
    success: {
      main: '#34C759',
      light: '#5FD37E',
      dark: '#248F40',
    },
    warning: {
      main: '#FF9500',
      light: '#FFAA33',
      dark: '#CC7700',
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
  },
} as const;

/** Light theme variants */
export const lightThemes = {
  default: {
    ...palettes.common,
    ...palettes.default,
    background: {
      default: '#FFFFFF',
      paper: '#F5F5F5',
      elevated: '#FFFFFF',
    },
    text: {
      primary: palettes.common.grey[900],
      secondary: palettes.common.grey[700],
      disabled: palettes.common.grey[500],
      inverse: '#FFFFFF',
    },
    divider: palettes.common.grey[200],
    border: palettes.common.grey[300],
  },
  nature: {
    ...palettes.common,
    ...palettes.nature,
    background: {
      default: '#F1F8E9',
      paper: '#F9FBE7',
      elevated: '#FFFFFF',
    },
    text: {
      primary: palettes.common.grey[900],
      secondary: palettes.common.grey[700],
      disabled: palettes.common.grey[500],
      inverse: '#FFFFFF',
    },
    divider: palettes.common.grey[200],
    border: palettes.common.grey[300],
  },
  ocean: {
    ...palettes.common,
    ...palettes.ocean,
    background: {
      default: '#E1F5FE',
      paper: '#E0F7FA',
      elevated: '#FFFFFF',
    },
    text: {
      primary: palettes.common.grey[900],
      secondary: palettes.common.grey[700],
      disabled: palettes.common.grey[500],
      inverse: '#FFFFFF',
    },
    divider: palettes.common.grey[200],
    border: palettes.common.grey[300],
  },
} as const;

/** Dark theme variants */
export const darkThemes = {
  default: {
    ...palettes.common,
    ...palettes.default,
    background: {
      default: '#121212',
      paper: '#1E1E1E',
      elevated: '#2C2C2C',
    },
    text: {
      primary: '#FFFFFF',
      secondary: palettes.common.grey[400],
      disabled: palettes.common.grey[600],
      inverse: palettes.common.grey[900],
    },
    divider: palettes.common.grey[800],
    border: palettes.common.grey[700],
  },
  nature: {
    ...palettes.common,
    ...palettes.nature,
    background: {
      default: '#1B2A1B',
      paper: '#243024',
      elevated: '#2D392D',
    },
    text: {
      primary: '#FFFFFF',
      secondary: palettes.common.grey[400],
      disabled: palettes.common.grey[600],
      inverse: palettes.common.grey[900],
    },
    divider: palettes.common.grey[800],
    border: palettes.common.grey[700],
  },
  ocean: {
    ...palettes.common,
    ...palettes.ocean,
    background: {
      default: '#0A1929',
      paper: '#132F4C',
      elevated: '#173A5E',
    },
    text: {
      primary: '#FFFFFF',
      secondary: palettes.common.grey[400],
      disabled: palettes.common.grey[600],
      inverse: palettes.common.grey[900],
    },
    divider: palettes.common.grey[800],
    border: palettes.common.grey[700],
  },
} as const;

export type ThemeColors = typeof lightThemes.default;
export type ColorKeys = keyof typeof lightThemes.default;
