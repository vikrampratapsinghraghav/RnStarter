import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { PostList } from '../components/posts/PostList';

export const HomeScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background.default }]}>
      <PostList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
