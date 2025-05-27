/**
 * Spacing configuration for consistent layout throughout the application.
 * All spacing values are in pixels and follow a geometric progression.
 * 
 * @example
 * ```tsx
 * import { spacing, layout } from '../theme/spacing';
 * 
 * const styles = StyleSheet.create({
 *   container: {
 *     padding: spacing.md,
 *     borderRadius: layout.borderRadius.md,
 *   },
 * });
 * ```
 */
export const spacing = {
  /** Extra small spacing (4px) - Used for tight spaces */
  xs: 4,
  /** Small spacing (8px) - Used for compact elements */
  sm: 8,
  /** Medium spacing (16px) - Default spacing */
  md: 16,
  /** Large spacing (24px) - Used for component separation */
  lg: 24,
  /** Extra large spacing (32px) - Used for section separation */
  xl: 32,
  /** Double extra large spacing (48px) - Used for major section separation */
  xxl: 48,
} as const;

/** Type representing all spacing values */
export type Spacing = typeof spacing;
/** Type representing spacing keys */
export type SpacingKeys = keyof typeof spacing;

/**
 * Layout configuration for consistent component layouts.
 * Includes common layout values like padding and border radius.
 */
export const layout = {
  /** Default screen padding */
  screenPadding: spacing.md,
  /** Default container padding */
  containerPadding: spacing.lg,
  /** Border radius values for different component sizes */
  borderRadius: {
    /** Small border radius (4px) - Used for small elements */
    sm: 4,
    /** Medium border radius (8px) - Default radius */
    md: 8,
    /** Large border radius (12px) - Used for prominent elements */
    lg: 12,
    /** Extra large border radius (16px) - Used for floating elements */
    xl: 16,
  },
} as const; 