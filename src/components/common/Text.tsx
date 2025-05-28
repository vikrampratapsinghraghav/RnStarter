import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet, I18nManager } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

export interface TextProps extends RNTextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'body2' | 'caption' | 'button';
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

const getVariantStyles = (variant: TextProps['variant']) => {
  switch (variant) {
    case 'h1':
      return styles.h1;
    case 'h2':
      return styles.h2;
    case 'h3':
      return styles.h3;
    case 'h4':
      return styles.h4;
    case 'body2':
      return styles.body2;
    case 'caption':
      return styles.caption;
    case 'button':
      return styles.button;
    case 'body1':
    default:
      return styles.body1;
  }
};

export const Text: React.FC<TextProps> = ({
  variant = 'body1',
  style,
  color,
  align = 'auto',
  children,
  ...props
}) => {
  const { theme } = useTheme();

  const textAlign = align === 'auto' ? (I18nManager.isRTL ? 'right' : 'left') : align;

  return (
    <RNText
      style={[
        getVariantStyles(variant),
        {
          color: color || theme.text.primary,
          textAlign,
          writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
        },
        style,
      ]}
      {...props}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  h2: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 36,
  },
  h3: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  h4: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 28,
  },
  body1: {
    fontSize: 16,
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
});
