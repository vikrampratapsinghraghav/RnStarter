import React, { useEffect, useCallback, useMemo } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TextInput,
} from 'react-native';
import { Text } from './common';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchPaginatedPosts,
  deletePost,
  setFilter,
  setSortBy,
  setSortOrder,
  toggleFavorite,
  setPage,
} from '../store/actions/posts.actions';
import {
  selectFilteredAndSortedPosts,
  selectFavoriteStatus,
  selectPaginationInfo,
} from '../store/reducers/posts.reducer';
import { useTheme } from '../theme/ThemeContext';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Post } from '../api/types';

export const PostList = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.posts);
  const posts = useAppSelector(selectFilteredAndSortedPosts);
  const pagination = useAppSelector(selectPaginationInfo);
  const { theme } = useTheme();
  const sortOrder = useAppSelector(state => state.posts.sortOrder);

  // Create a map of favorite statuses for all posts
  const favoriteStatuses = useAppSelector(state =>
    posts.reduce(
      (acc, post) => {
        acc[post.id] = selectFavoriteStatus(post.id)(state);
        return acc;
      },
      {} as Record<number, boolean>,
    ),
  );

  const loadPosts = useCallback(() => {
    dispatch(
      fetchPaginatedPosts({
        page: pagination.currentPage,
        limit: pagination.itemsPerPage,
      }),
    );
  }, [dispatch, pagination.currentPage, pagination.itemsPerPage]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const handleDeletePost = useCallback(
    (postId: number) => {
      dispatch(deletePost(postId));
    },
    [dispatch],
  );

  const handleToggleFavorite = useCallback(
    (postId: number) => {
      dispatch(toggleFavorite(postId));
    },
    [dispatch],
  );

  const handleSearch = useCallback(
    (text: string) => {
      dispatch(setFilter(text));
    },
    [dispatch],
  );

  const handleSort = useCallback(() => {
    dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'));
  }, [dispatch, sortOrder]);

  const handleLoadMore = useCallback(() => {
    if (!loading && posts.length < pagination.totalItems) {
      dispatch(setPage(pagination.currentPage + 1));
    }
  }, [dispatch, loading, posts.length, pagination.totalItems, pagination.currentPage]);

  const renderItem = useCallback(
    ({ item }: { item: Post }) => {
      const isFavorite = favoriteStatuses[item.id];

      return (
        <View style={[styles.postCard, { backgroundColor: theme.background.paper }]}>
          <View style={styles.postHeader}>
            <Text variant="h4" style={styles.title}>
              {item.title}
            </Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity
                onPress={() => handleToggleFavorite(item.id)}
                style={styles.actionButton}>
                <Icon
                  name={isFavorite ? 'heart' : 'heart-outline'}
                  size={24}
                  color={isFavorite ? theme.error.main : theme.text.secondary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDeletePost(item.id)}
                style={styles.actionButton}>
                <Icon name="delete" size={24} color={theme.error.main} />
              </TouchableOpacity>
            </View>
          </View>
          <Text variant="body1" style={styles.body}>
            {item.body}
          </Text>
        </View>
      );
    },
    [theme, favoriteStatuses, handleToggleFavorite, handleDeletePost],
  );

  const ListHeader = useCallback(
    () => (
      <View style={styles.header}>
        <TextInput
          style={[
            styles.searchInput,
            {
              backgroundColor: theme.background.paper,
              color: theme.text.primary,
              borderColor: theme.text.secondary,
            },
          ]}
          placeholder="Search posts..."
          placeholderTextColor={theme.text.secondary}
          onChangeText={handleSearch}
        />
        <TouchableOpacity
          onPress={handleSort}
          style={[styles.sortButton, { backgroundColor: theme.primary.main }]}>
          <Icon
            name={`sort-${sortOrder === 'asc' ? 'ascending' : 'descending'}`}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    ),
    [theme, handleSearch, handleSort, sortOrder],
  );

  if (error) {
    return (
      <View style={styles.centered}>
        <Text variant="body1" style={[styles.errorText, { color: theme.error.main }]}>
          {error}
        </Text>
        <TouchableOpacity
          style={[styles.retryButton, { backgroundColor: theme.primary.main }]}
          onPress={loadPosts}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.container}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={loadPosts}
          colors={[theme.primary.main]}
          tintColor={theme.primary.main}
        />
      }
      ListHeaderComponent={ListHeader}
      ListEmptyComponent={
        !loading ? (
          <View style={styles.centered}>
            <Text variant="body1" style={styles.emptyText}>
              No posts available
            </Text>
          </View>
        ) : null
      }
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  sortButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  postCard: {
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    flex: 1,
    marginRight: 16,
  },
  body: {
    lineHeight: 20,
  },
  separator: {
    height: 16,
  },
  errorText: {
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyText: {
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 4,
    marginLeft: 8,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  retryText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
