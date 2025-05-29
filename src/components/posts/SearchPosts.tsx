import React, { useState, useMemo } from 'react';
import { View, TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import { Text } from '@components/common';
import { useTheme } from '@theme/ThemeContext';
import { useTranslation } from '@localization/useTranslation';
import { useDebounce } from '@hooks/useDebounce';
import { useSelector } from 'react-redux';
import { RootState } from '@store/types';
import { selectFilteredAndSortedPosts } from '@store/slices/postsSlice';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface SearchPostsProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const SearchPosts: React.FC<SearchPostsProps> = ({ value, onChangeText }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  const allPosts = useSelector((state: RootState) => selectFilteredAndSortedPosts(state));
  
  const filteredPosts = useMemo(() => {
    if (!debouncedSearchTerm) return [];
    const searchLower = debouncedSearchTerm.toLowerCase();
    return allPosts.filter(
      post =>
        post.title.toLowerCase().includes(searchLower) ||
        post.body.toLowerCase().includes(searchLower)
    );
  }, [debouncedSearchTerm, allPosts]);

  const renderPost = ({ item }: { item: Post }) => (
    <View style={[styles.postContainer, { backgroundColor: theme.background.paper }]}>
      <Text style={[styles.title, { color: theme.text.primary }]}>{item.title}</Text>
      <Text numberOfLines={2} style={[styles.body, { color: theme.text.secondary }]}>
        {item.body}
      </Text>
    </View>
  );

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
      />

      {debouncedSearchTerm.length > 0 && (
        <>
          {filteredPosts.length === 0 ? (
            <View style={styles.centered}>
              <Text style={{ color: theme.text.secondary }}>{t('posts.empty.title')}</Text>
            </View>
          ) : (
            <View>
              {filteredPosts.map(post => (
                <View key={post.id.toString()}>
                  {renderPost({ item: post })}
                  <View style={styles.separator} />
                </View>
              ))}
            </View>
          )}
        </>
      )}
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
  centered: {
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postContainer: {
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  separator: {
    height: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
  },
});
