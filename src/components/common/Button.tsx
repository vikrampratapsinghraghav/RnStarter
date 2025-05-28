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
  ActivityIndicator,
  StyleSheet,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { Text } from './Text';
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
  /** Whether to show a loading spinner instead of the title */
  loading?: boolean;
  /** Additional styles to apply to the button */
  style?: ViewStyle;
}

/**
 * A reusable button component that supports different visual styles and states.
 *
 * @param props - The component props
 * @param props.title - The text to display inside the button
 * @param props.variant - The visual style variant ('primary' | 'secondary' | 'outline')
 * @param props.loading - Whether to show a loading spinner
 * @param props.style - Additional styles to apply to the button
 * @param props.disabled - Whether the button is disabled
 */
export const Button = ({
  title,
  variant = 'primary',
  loading = false,
  style,
  disabled,
  ...props
}: ButtonProps) => {
  const { theme } = useTheme();

  const getBackgroundColor = () => {
    if (disabled) return theme.text.disabled;
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

  const getTextColor = () => {
    if (disabled) return theme.text.inverse;
    switch (variant) {
      case 'outline':
        return theme.primary.main;
      default:
        return theme.text.inverse;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: variant === 'outline' ? theme.primary.main : 'transparent',
          borderWidth: variant === 'outline' ? 1 : 0,
        },
        style,
      ]}
      disabled={disabled || loading}
      {...props}>
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text variant="button" style={{ color: getTextColor() }}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

// Styles for the button component
const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
});
