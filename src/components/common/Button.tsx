/**
 * A customizable button component that supports different variants, sizes, and loading states.
 * This component is built on top of TouchableOpacity and follows the app's theme system.
 *
 * @example
 * ```tsx
 * <Button
 *   title="Submit"
 *   variant="primary"
 *   size="medium"
 *   onPress={() => handleSubmit()}
 *   loading={isSubmitting}
 * />
 * ```
 */
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  ActivityIndicator,
  TextStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

/**
 * Props for the Button component.
 * Extends TouchableOpacityProps to maintain all standard button functionality.
 */
interface ButtonProps extends TouchableOpacityProps {
  /** The text to display inside the button */
  title: string;
  /** The visual style variant of the button */
  variant?: 'primary' | 'secondary' | 'outline';
  /** The size of the button, affecting padding and font size */
  size?: 'small' | 'medium' | 'large';
  /** Whether to show a loading spinner instead of the title */
  loading?: boolean;
}

/**
 * A reusable button component that supports different visual styles and states.
 *
 * @param props - The component props
 * @param props.title - The text to display inside the button
 * @param props.variant - The visual style variant ('primary' | 'secondary' | 'outline')
 * @param props.size - The size of the button ('small' | 'medium' | 'large')
 * @param props.loading - Whether to show a loading spinner
 * @param props.style - Additional styles to apply to the button
 * @param props.disabled - Whether the button is disabled
 */
export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  style,
  disabled,
  ...props
}) => {
  const { theme } = useTheme();

  const getVariantColor = () => {
    switch (variant) {
      case 'primary':
        return theme.primary.main;
      case 'secondary':
        return theme.secondary.main;
      case 'outline':
        return 'transparent';
      default:
        return theme.primary.main;
    }
  };

  const getTextColor = (): string => {
    if (disabled) {
      return theme.text.disabled;
    }
    if (variant === 'outline') {
      return theme.primary.main;
    }
    return theme.text.inverse;
  };

  const getPadding = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: theme.spacing.xs,
          paddingHorizontal: theme.spacing.sm,
        };
      case 'large':
        return {
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.lg,
        };
      default:
        return {
          paddingVertical: theme.spacing.sm,
          paddingHorizontal: theme.spacing.md,
        };
    }
  };

  const getFontSize = (): number => {
    switch (size) {
      case 'small':
        return theme.typography.fontSize.sm;
      case 'large':
        return theme.typography.fontSize.lg;
      default:
        return theme.typography.fontSize.md;
    }
  };

  const buttonStyles = [
    styles.base,
    {
      backgroundColor: getVariantColor(),
      borderWidth: variant === 'outline' ? 1 : 0,
      borderColor: variant === 'outline' ? theme.primary.main : undefined,
      ...getPadding(),
    },
    disabled && { opacity: 0.5 },
    style,
  ];

  const textStyles: TextStyle = {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: getFontSize(),
    color: getTextColor(),
    textAlign: 'center',
  };

  return (
    <TouchableOpacity style={buttonStyles} disabled={disabled || loading} {...props}>
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? theme.primary.main : theme.text.inverse}
        />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

// Styles for the button component
const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
