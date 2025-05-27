import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useTranslation } from '../localization/useTranslation';
import { Button } from '../components';

export const ThemeSettingsScreen = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background.default }]}
    >
      <Text style={[styles.title, { color: theme.text.primary }]}>
        {t('theme.title')}
      </Text>
      <Text style={[styles.description, { color: theme.text.secondary }]}>
        {t('settings.theme.description')}
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          title={theme.isDark ? t('theme.light') : t('theme.dark')}
          onPress={toggleTheme}
          variant="primary"
        />
      </View>

      <View style={[styles.section, { backgroundColor: theme.background.paper }]}>
        <Text style={[styles.sectionTitle, { color: theme.text.primary }]}>
          {t('theme.colors.title')}
        </Text>
        <View style={styles.colorGrid}>
          {[
            { color: theme.primary.main, name: t('theme.colors.primary') },
            { color: theme.secondary.main, name: t('theme.colors.secondary') },
            { color: theme.error.main, name: t('theme.colors.error') },
            { color: theme.success.main, name: t('theme.colors.success') },
            { color: theme.warning.main, name: t('theme.colors.warning') },
          ].map((item, index) => (
            <View key={index} style={styles.colorItem}>
              <View style={[styles.colorBox, { backgroundColor: item.color }]} />
              <Text style={[styles.colorName, { color: theme.text.primary }]}>
                {item.name}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 16,
  },
  description: {
    fontSize: 16,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  buttonContainer: {
    padding: 16,
  },
  section: {
    marginTop: 24,
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  colorItem: {
    alignItems: 'center',
    width: 80,
  },
  colorBox: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginBottom: 8,
  },
  colorName: {
    fontSize: 12,
    textAlign: 'center',
  },
}); 