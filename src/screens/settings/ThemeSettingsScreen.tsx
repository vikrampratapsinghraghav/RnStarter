import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { useTheme } from '@theme/ThemeContext';

export const ThemeSettingsScreen = () => {
  const { theme, themeMode, themeVariant, setThemeMode, setThemeVariant } = useTheme();

  const themeModes = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
    { label: 'System', value: 'system' },
  ];

  const themeVariants = [
    { label: 'Default', value: 'default', description: 'Classic blue theme with modern aesthetics' },
    { label: 'Nature', value: 'nature', description: 'Earthy green theme inspired by nature' },
    { label: 'Ocean', value: 'ocean', description: 'Calming blue theme inspired by the ocean' },
  ];

  const RadioButton = ({ selected, onPress }: { selected: boolean; onPress: () => void }) => (
    <Pressable
      onPress={onPress}
      style={[
        styles.radio,
        {
          borderColor: theme.primary.main,
          backgroundColor: theme.background.paper,
        },
      ]}
    >
      {selected && (
        <View
          style={[
            styles.radioInner,
            {
              backgroundColor: theme.primary.main,
            },
          ]}
        />
      )}
    </Pressable>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background.default }]}>
      <Text style={[styles.title, { color: theme.text.primary }]}>
        Theme Settings
      </Text>

      <View style={[styles.card, { backgroundColor: theme.background.paper }]}>
        <Text style={[styles.sectionTitle, { color: theme.text.primary }]}>
          Theme Mode
        </Text>
        <View style={styles.optionsContainer}>
          {themeModes.map(mode => (
            <TouchableOpacity
              key={mode.value}
              style={styles.optionRow}
              onPress={() => setThemeMode(mode.value as 'light' | 'dark' | 'system')}
            >
              <RadioButton
                selected={themeMode === mode.value}
                onPress={() => setThemeMode(mode.value as 'light' | 'dark' | 'system')}
              />
              <Text style={[styles.optionLabel, { color: theme.text.primary }]}>
                {mode.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.spacing} />

      <View style={[styles.card, { backgroundColor: theme.background.paper }]}>
        <Text style={[styles.sectionTitle, { color: theme.text.primary }]}>
          Theme Variant
        </Text>
        <View style={styles.optionsContainer}>
          {themeVariants.map(variant => (
            <TouchableOpacity
              key={variant.value}
              style={styles.optionRow}
              onPress={() => setThemeVariant(variant.value as 'default' | 'nature' | 'ocean')}
            >
              <RadioButton
                selected={themeVariant === variant.value}
                onPress={() => setThemeVariant(variant.value as 'default' | 'nature' | 'ocean')}
              />
              <View style={styles.variantTextContainer}>
                <Text style={[styles.optionLabel, { color: theme.text.primary }]}>
                  {variant.label}
                </Text>
                <Text style={[styles.optionDescription, { color: theme.text.secondary }]}>
                  {variant.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.spacing} />

      <View style={[styles.card, { backgroundColor: theme.background.paper }]}>
        <Text style={[styles.sectionTitle, { color: theme.text.primary }]}>
          Preview
        </Text>
        <View style={styles.previewContainer}>
          <View
            style={[
              styles.colorPreview,
              { backgroundColor: theme.primary.main },
            ]}
          >
            <Text style={styles.previewText}>
              Primary
            </Text>
          </View>
          <View
            style={[
              styles.colorPreview,
              { backgroundColor: theme.secondary.main },
            ]}
          >
            <Text style={styles.previewText}>
              Secondary
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  spacing: {
    height: 16,
  },
  optionsContainer: {
    gap: 12,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  optionLabel: {
    fontSize: 16,
    marginLeft: 12,
  },
  optionDescription: {
    fontSize: 14,
    marginTop: 2,
  },
  variantTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  previewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  colorPreview: {
    flex: 1,
    height: 100,
    marginHorizontal: 4,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
