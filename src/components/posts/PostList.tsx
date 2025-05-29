import React from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { Text } from '@components/common';
import { useTheme } from '@theme/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store/types';
import { fetchPosts, selectFilteredAndSortedPosts } from '@store/slices/postsSlice';
import { Post } from '@api/types';

interface PostListProps {
  posts?: Post[];
}

export const PostList: React.FC<PostListProps> = ({ posts: propPosts }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const storePosts = useSelector((state: RootState) => selectFilteredAndSortedPosts(state));
  const [refreshing, setRefreshing] = React.useState(false);

  const posts = propPosts || storePosts;

  const onRefresh = React.useCallback(() => {
    if (propPosts) return; // Don't refresh if using provided posts
    setRefreshing(true);
    dispatch(fetchPosts())
      .finally(() => setRefreshing(false));
  }, [dispatch, propPosts]);

  React.useEffect(() => {
    if (!propPosts) {
      dispatch(fetchPosts());
    }
  }, [dispatch, propPosts]);

  const renderPost = ({ item }: { item: Post }) => (
    <View style={[styles.postContainer, { backgroundColor: theme.background.paper }]}>
      <Text 
        style={[styles.title, { color: theme.text.primary }]} 
        numberOfLines={2}
      >
        {item.title}
      </Text>
      <Text 
        style={[styles.body, { color: theme.text.secondary }]} 
        numberOfLines={3}
      >
        {item.body}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderPost}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={[styles.listContainer, { backgroundColor: theme.background.default }]}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      refreshControl={
        propPosts ? undefined : (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.primary.main]}
            tintColor={theme.primary.main}
          />
        )
      }
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
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