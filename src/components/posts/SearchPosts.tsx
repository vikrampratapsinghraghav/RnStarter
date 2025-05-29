import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '@theme/ThemeContext';
import { useTranslation } from '@localization/useTranslation';

interface SearchPostsProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const SearchPosts: React.FC<SearchPostsProps> = ({ value, onChangeText }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={[styles.container, { backgroundColor: theme.background.default }]}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.background.paper,
            borderColor: theme.background.elevated,
            color: theme.text.primary,
          },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={t('posts.search.placeholder')}
        placeholderTextColor={theme.text.disabled}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
});
