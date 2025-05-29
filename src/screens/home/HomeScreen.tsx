import React, { useState, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@theme/ThemeContext';
import { useTranslation } from '@localization/useTranslation';
import { useAuth } from '../auth/context/AuthContext';
import { PostList, SearchPosts } from '@components/posts';
import { useSelector } from 'react-redux';
import { RootState } from '@store/types';
import { selectFilteredAndSortedPosts } from '@store/slices/postsSlice';
import { useDebounce } from '@hooks/useDebounce';
import { Text } from '@components/common';

export const HomeScreen = () => {
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

  const renderSearchResults = () => {
    if (!debouncedSearchTerm) return null;
    
    if (filteredPosts.length === 0) {
      return (
        <View style={styles.centered}>
          <Text style={{ color: theme.text.secondary }}>{t('posts.empty.title')}</Text>
        </View>
      );
    }

    return (
      <View style={styles.searchResults}>
        <Text style={[styles.searchResultsTitle, { color: theme.text.primary }]}>
          {t('posts.search.results', { count: filteredPosts.length })}
        </Text>
        <PostList posts={filteredPosts} />
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background.default }]}>
      <SearchPosts 
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <View style={styles.divider} />
      {debouncedSearchTerm ? renderSearchResults() : <PostList />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  divider: {
    height: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchResults: {
    flex: 1,
  },
  searchResultsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
}); 