import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@theme/ThemeContext';
import { useTranslation } from '@localization/useTranslation';
import { Text } from '@components/common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const ThemeSettingsScreen = () => {
  const { theme, themeMode, setThemeMode } = useTheme();
  const { t } = useTranslation();

  const ThemeOption = ({
    mode,
    icon,
    label,
  }: {
    mode: 'light' | 'dark' | 'system';
    icon: string;
    label: string;
  }) => (
    <TouchableOpacity
      style={[
        styles.themeOption,
        {
          backgroundColor: theme.background.paper,
          borderColor: themeMode === mode ? theme.primary.main : 'transparent',
        },
      ]}
      onPress={() => setThemeMode(mode)}>
      <Icon
        name={icon}
        size={24}
        color={themeMode === mode ? theme.primary.main : theme.text.primary}
      />
      <Text
        variant="body1"
        style={[
          styles.themeLabel,
          { color: themeMode === mode ? theme.primary.main : theme.text.primary },
        ]}>
        {label}
      </Text>
      {themeMode === mode && (
        <Icon name="check" size={20} color={theme.primary.main} style={styles.checkIcon} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background.default }]}>
      <Text variant="h3" style={[styles.title, { color: theme.text.primary }]}>
        {t('settings.theme.title')}
      </Text>
      <Text variant="body1" style={[styles.description, { color: theme.text.secondary }]}>
        {t('settings.theme.description')}
      </Text>

      <View style={styles.optionsContainer}>
        <ThemeOption mode="light" icon="white-balance-sunny" label={t('theme.light')} />
        <ThemeOption mode="dark" icon="moon-waning-crescent" label={t('theme.dark')} />
        <ThemeOption mode="system" icon="theme-light-dark" label={t('theme.system')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 8,
  },
  description: {
    marginBottom: 24,
  },
  optionsContainer: {
    gap: 12,
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
  },
  themeLabel: {
    marginLeft: 12,
    flex: 1,
  },
  checkIcon: {
    marginLeft: 8,
  },
});
