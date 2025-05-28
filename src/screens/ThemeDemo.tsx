import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, I18nManager } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useTranslation } from '../localization/useTranslation';
import { Button } from '../components';

const ColorBox = ({
  color,
  name,
  textColor,
}: {
  color: string;
  name: string;
  textColor: string;
}) => {
  const { isRTL } = useTranslation();

  return (
    <View style={[styles.colorBoxContainer, isRTL && styles.rtl]}>
      <View style={[styles.colorBox, { backgroundColor: color }]} />
      <Text style={[styles.colorName, { color: textColor }]}>{name}</Text>
      <Text style={[styles.colorValue, { color: textColor }]}>{color}</Text>
    </View>
  );
};

const Section = ({
  title,
  children,
  textColor,
}: {
  title: string;
  children: React.ReactNode;
  textColor: string;
}) => {
  const { isRTL } = useTranslation();

  return (
    <View style={[styles.section, isRTL && styles.rtl]}>
      <Text style={[styles.sectionTitle, { color: textColor }]}>{title}</Text>
      {children}
    </View>
  );
};

export const ThemeDemo = () => {
  const { theme, toggleTheme } = useTheme();
  const { t, isRTL, currentLanguage, setLanguage } = useTranslation();

  if (isRTL) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1976D2" />
      </View>
    );
  }

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: theme.background.default },
        isRTL && styles.rtl,
      ]}>
      <View style={[styles.header, isRTL && styles.rtl]}>
        <Text style={[styles.title, { color: theme.text.primary }]}>{t('theme.title')}</Text>
        <View style={styles.headerButtons}>
          <Button
            title={theme.isDark ? t('theme.light') : t('theme.dark')}
            onPress={toggleTheme}
            variant="primary"
          />
          <Button
            title={currentLanguage === 'en' ? 'العربية' : 'English'}
            onPress={() => setLanguage(currentLanguage === 'en' ? 'ar' : 'en')}
            variant="secondary"
          />
        </View>
      </View>

      <Section title={t('theme.colors')} textColor={theme.text.primary}>
        <View style={styles.colorGrid}>
          <ColorBox
            color={theme.primary.main}
            name={t('theme.colors.primary')}
            textColor={theme.text.primary}
          />
          <ColorBox
            color={theme.secondary.main}
            name={t('theme.colors.secondary')}
            textColor={theme.text.primary}
          />
          <ColorBox
            color={theme.error.main}
            name={t('theme.colors.error')}
            textColor={theme.text.primary}
          />
          <ColorBox
            color={theme.success.main}
            name={t('theme.colors.success')}
            textColor={theme.text.primary}
          />
          <ColorBox
            color={theme.warning.main}
            name={t('theme.colors.warning')}
            textColor={theme.text.primary}
          />
        </View>
      </Section>

      <Section title={t('theme.typography')} textColor={theme.text.primary}>
        <Text style={[styles.xxxl, { color: theme.text.primary }]}>
          {t('theme.typography.xxxl', { size: theme.typography.fontSize.xxxl })}
        </Text>
        <Text style={[styles.xxl, { color: theme.text.primary }]}>
          {t('theme.typography.xxl', { size: theme.typography.fontSize.xxl })}
        </Text>
        <Text style={[styles.xl, { color: theme.text.primary }]}>
          {t('theme.typography.xl', { size: theme.typography.fontSize.xl })}
        </Text>
        <Text style={[styles.lg, { color: theme.text.primary }]}>
          {t('theme.typography.lg', { size: theme.typography.fontSize.lg })}
        </Text>
        <Text style={[styles.md, { color: theme.text.primary }]}>
          {t('theme.typography.md', { size: theme.typography.fontSize.md })}
        </Text>
        <Text style={[styles.sm, { color: theme.text.secondary }]}>
          {t('theme.typography.sm', { size: theme.typography.fontSize.sm })}
        </Text>
        <Text style={[styles.xs, { color: theme.text.disabled }]}>
          {t('theme.typography.xs', { size: theme.typography.fontSize.xs })}
        </Text>
      </Section>

      <Section title={t('theme.surfaces')} textColor={theme.text.primary}>
        <View style={[styles.surface, { backgroundColor: theme.background.paper }]}>
          <Text style={[styles.md, { color: theme.text.primary }]}>
            {t('theme.surfaces.paper')}
          </Text>
        </View>
        <View style={[styles.surface, { backgroundColor: theme.background.elevated }]}>
          <Text style={[styles.md, { color: theme.text.primary }]}>
            {t('theme.surfaces.elevated')}
          </Text>
        </View>
      </Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  colorBoxContainer: {
    alignItems: 'center',
    width: 100,
  },
  colorBox: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },
  colorName: {
    fontSize: 14,
    fontWeight: '500',
  },
  colorValue: {
    fontSize: 12,
  },
  surface: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  xxxl: {
    fontSize: 32,
    marginBottom: 8,
  },
  xxl: {
    fontSize: 24,
    marginBottom: 8,
  },
  xl: {
    fontSize: 20,
    marginBottom: 8,
  },
  lg: {
    fontSize: 18,
    marginBottom: 8,
  },
  md: {
    fontSize: 16,
    marginBottom: 8,
  },
  sm: {
    fontSize: 14,
    marginBottom: 8,
  },
  xs: {
    fontSize: 12,
    marginBottom: 8,
  },
  rtl: {
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
  },
});
