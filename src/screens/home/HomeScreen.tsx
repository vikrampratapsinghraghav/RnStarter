import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from '../../components/common';
import { useTheme } from '../../theme/ThemeContext';
import { useTranslation } from '../../localization/useTranslation';
import { useAuth } from '../auth/context/AuthContext';

export const HomeScreen = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { logout } = useAuth();

  return (
    <View style={[styles.container, { backgroundColor: theme.background.default }]}>
      <Text
        variant="h1"
        style={[styles.title, { color: theme.text.primary }]}>
        {t('screens.home.title')}
      </Text>
      <Text
        variant="body1"
        style={[styles.subtitle, { color: theme.text.secondary }]}>
        {t('screens.home.subtitle')}
      </Text>
      <Button
        title={t('auth.logout.title')}
        onPress={logout}
        variant="secondary"
        style={styles.logoutButton}
      />
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
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 32,
  },
  logoutButton: {
    width: '100%',
    maxWidth: 300,
  },
}); 