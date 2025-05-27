import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useTranslation } from '../localization/useTranslation';
import { Text } from '../components/common';

export const ProfileScreen = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={[styles.container, { backgroundColor: theme.background.default }]}>
      <Text
        variant="h2"
        color={theme.text.primary}
        style={styles.title}
      >
        {t('screens.profile.title')}
      </Text>
      <Text
        variant="body1"
        color={theme.text.secondary}
        style={styles.subtitle}
      >
        {t('screens.profile.subtitle')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
}); 