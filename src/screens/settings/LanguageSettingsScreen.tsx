import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@/theme/ThemeContext';
import { useLanguage } from '@/localization/LanguageContext';
import { useTranslation } from '@/localization/useTranslation';
import { I18nManager } from 'react-native';
import { Text } from '@/components/common';

export const LanguageSettingsScreen = () => {
  const { theme } = useTheme();
  const { currentLanguage, setLanguage, availableLanguages } = useLanguage();
  const { t } = useTranslation();

  const handleLanguageChange = async (code: string) => {
    const isRTL = ['ar', 'he', 'fa'].includes(code);
    const needsRestart = I18nManager.isRTL !== isRTL;

    if (needsRestart) {
      Alert.alert(
        t('settings.language.restartTitle'),
        t('settings.language.restartMessage'),
        [
          {
            text: t('common.buttons.cancel'),
            style: 'cancel',
          },
          {
            text: t('common.buttons.continue'),
            onPress: async () => {
              await setLanguage(code);
            },
          },
        ],
        { cancelable: true },
      );
    } else {
      await setLanguage(code);
    }
  };

  const LanguageItem = ({
    code,
    name,
    isSelected,
  }: {
    code: string;
    name: string;
    isSelected: boolean;
  }) => (
    <TouchableOpacity
      style={[
        styles.languageItem,
        { backgroundColor: theme.background.paper },
        isSelected && { borderColor: theme.primary.main },
      ]}
      onPress={() => handleLanguageChange(code)}>
      <Icon
        name={isSelected ? 'check-circle' : 'circle-outline'}
        size={24}
        color={isSelected ? theme.primary.main : theme.text.disabled}
      />
      <Text variant="body1" style={styles.languageName} color={theme.text.primary}>
        {name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background.default }]}>
      <Text variant="h3" style={styles.title} color={theme.text.primary}>
        {t('settings.language.title')}
      </Text>
      <View style={styles.languageList}>
        {availableLanguages.map(lang => (
          <LanguageItem
            key={lang.code}
            code={lang.code}
            name={lang.name}
            isSelected={currentLanguage === lang.code}
          />
        ))}
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
  languageList: {
    gap: 16,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  languageName: {
    marginLeft: 16,
    marginRight: 16,
  },
});
