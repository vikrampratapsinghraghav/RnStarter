/**
 * Typography configuration for consistent text styling throughout the application.
 * Includes font families, sizes, and line heights with platform-specific adjustments.
 *
 * @example
 * ```tsx
 * import { typography } from '../theme/typography';
 *
 * const styles = StyleSheet.create({
 *   title: {
 *     fontFamily: typography.fontFamily.bold,
 *     fontSize: typography.fontSize.xl,
 *     lineHeight: typography.lineHeight.xl,
 *   },
 * });
 * ```
 */
import { Platform } from 'react-native';

export const typography = {
  /** Font families for different text weights */
  fontFamily: {
    /** Regular weight font - System default */
    regular: Platform.select({
      ios: 'System',
      android: 'Roboto',
    }),
    /** Medium weight font - Used for emphasis */
    medium: Platform.select({
      ios: 'System',
      android: 'Roboto-Medium',
    }),
    /** Bold weight font - Used for headers */
    bold: Platform.select({
      ios: 'System',
      android: 'Roboto-Bold',
    }),
  },
  /** Font sizes for different text styles */
  fontSize: {
    /** Extra small text (12px) - Used for captions */
    xs: 12,
    /** Small text (14px) - Used for secondary text */
    sm: 14,
    /** Medium text (16px) - Default body text */
    md: 16,
    /** Large text (18px) - Used for important text */
    lg: 18,
    /** Extra large text (20px) - Used for subtitles */
    xl: 20,
    /** Double extra large text (24px) - Used for headers */
    xxl: 24,
    /** Triple extra large text (32px) - Used for major headers */
    xxxl: 32,
  },
  /** Line heights for different text sizes */
  lineHeight: {
    /** Extra small line height (16px) */
    xs: 16,
    /** Small line height (20px) */
    sm: 20,
    /** Medium line height (24px) - Default */
    md: 24,
    /** Large line height (28px) */
    lg: 28,
    /** Extra large line height (32px) */
    xl: 32,
    /** Double extra large line height (36px) */
    xxl: 36,
    /** Triple extra large line height (40px) */
    xxxl: 40,
  },
} as const;

/** Type representing the entire typography configuration */
export type Typography = typeof typography;

/** Type representing typography category keys */
export type TypographyKeys = keyof typeof typography;
