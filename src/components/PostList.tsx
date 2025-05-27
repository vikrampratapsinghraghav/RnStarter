import React, { useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { Text } from './common';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchPosts, deletePost } from '../store/slices/postsSlice';
import { useTheme } from '../theme/ThemeContext';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const PostList = () => {
  const dispatch = useAppDispatch();
  const { items: posts, loading, error } = useAppSelector((state) => state.posts);
  const { theme } = useTheme();

  const loadPosts = useCallback(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const handleDeletePost = (postId: number) => {
    dispatch(deletePost(postId));
  };

  const renderItem = ({ item }: { item: { id: number; title: string; body: string } }) => (
    <View style={[styles.postCard, { backgroundColor: theme.background.paper }]}>
      <View style={styles.postHeader}>
        <Text variant="h4" style={styles.title}>{item.title}</Text>
        <TouchableOpacity 
          onPress={() => handleDeletePost(item.id)}
          style={styles.deleteButton}
        >
          <Icon name="delete" size={24} color={theme.error.main} />
        </TouchableOpacity>
      </View>
      <Text type="secondary" style={styles.body}>{item.body}</Text>
    </View>
  );

  if (error) {
    return (
      <View style={styles.centered}>
        <Text type="error" style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={[styles.retryButton, { backgroundColor: theme.primary.main }]}
          onPress={loadPosts}
        >
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
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
      ListEmptyComponent={
        !loading ? (
          <View style={styles.centered}>
            <Text type="secondary" style={styles.emptyText}>No posts available</Text>
          </View>
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
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
  deleteButton: {
    padding: 4,
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