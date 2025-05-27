/**
 * Color palette configuration for the application.
 * Supports both light and dark themes with consistent color mapping.
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

/** Base color palette that remains constant across themes */
const palette = {
  primary: {
    main: '#007AFF',    // Main brand color
    light: '#4DA3FF',    // Lighter version for hover states
    dark: '#0055B3',     // Darker version for active states
  },
  secondary: {
    main: '#5856D6',    // Secondary brand color
    light: '#7A79E0',    // Lighter version for hover states
    dark: '#3E3D94',     // Darker version for active states
  },
  error: {
    main: '#FF3B30',     // Main error color
    light: '#FF6961',     // Lighter version
    dark: '#CC2F26',      // Darker version
  },
  success: {
    main: '#34C759',     // Main success color
    light: '#5FD37E',     // Lighter version
    dark: '#248F40',      // Darker version
  },
  warning: {
    main: '#FF9500',      // Main warning color
    light: '#FFAA33',      // Lighter version
    dark: '#CC7700',       // Darker version
  },
  grey: {
    50: '#FAFAFA',        // Lightest grey
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',        // Medium grey
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',        // Darkest grey
  },
} as const;

/** Light theme colors */
export const lightColors = {
  ...palette,
  background: {
    default: '#FFFFFF',    // Default background
    paper: '#F5F5F5',        // Elevated surface color
    elevated: '#FFFFFF',
  },
  text: {
    primary: palette.grey[900],    // Primary text
    secondary: palette.grey[700],   // Secondary text
    disabled: palette.grey[500],     // Disabled text
    inverse: '#FFFFFF',
  },
  divider: palette.grey[200],
  border: palette.grey[300],
  action: {
    active: palette.grey[800],
    hover: palette.grey[100],
    selected: palette.grey[200],
    disabled: palette.grey[300],
    focus: palette.grey[200],
  },
} as const;

/** Dark theme colors */
export const darkColors = {
  ...palette,
  background: {
    default: '#121212',
    paper: '#1E1E1E',
    elevated: '#2C2C2C',
  },
  text: {
    primary: '#FFFFFF',
    secondary: palette.grey[400],
    disabled: palette.grey[600],
    inverse: palette.grey[900],
  },
  divider: palette.grey[800],
  border: palette.grey[700],
  action: {
    active: palette.grey[300],
    hover: palette.grey[800],
    selected: palette.grey[700],
    disabled: palette.grey[600],
    focus: palette.grey[700],
  },
} as const;

export type ThemeColors = typeof lightColors;
export type ColorKeys = keyof typeof lightColors; 