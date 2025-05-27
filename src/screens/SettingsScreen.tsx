import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../theme/ThemeContext';
import { useTranslation } from '../localization/useTranslation';
import { Text } from '../components/common';
import { useNavigation } from '@react-navigation/native';
import { SettingsStackNavigationProp } from '../navigation/types';

export const SettingsScreen = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<SettingsStackNavigationProp>();

  const SettingsItem = ({ icon, title, onPress }: {
    icon: string;
    title: string;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      style={[styles.settingsItem, { backgroundColor: theme.background.paper }]}
      onPress={onPress}
    >
      <Icon name={icon} size={24} color={theme.text.primary} />
      <Text
        variant="body1"
        color={theme.text.primary}
        style={styles.settingsItemText}
      >
        {title}
      </Text>
      <Icon name="chevron-right" size={24} color={theme.text.disabled} />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background.default }]}>
      <Text
        variant="h3"
        color={theme.text.primary}
        style={styles.title}
      >
        {t('screens.settings.title')}
      </Text>
      <View style={styles.settingsList}>
        <SettingsItem
          icon="translate"
          title={t('screens.settings.language')}
          onPress={() => navigation.navigate('LanguageSettings')}
        />
        <SettingsItem
          icon="palette"
          title={t('screens.settings.theme')}
          onPress={() => navigation.navigate('ThemeSettings')}
        />
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
    marginBottom: 24,
  },
  settingsList: {
    gap: 16,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
  },
  settingsItemText: {
    flex: 1,
    marginHorizontal: 16,
  },
}); 