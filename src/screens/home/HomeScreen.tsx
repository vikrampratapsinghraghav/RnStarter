import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@theme/ThemeContext';
import { useTranslation } from '@localization/useTranslation';
import { useAuth } from '@screens/auth/context/AuthContext';
import { PostList } from '@components/posts';

export const HomeScreen = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { logout } = useAuth();

  return (
    <View style={[styles.container, { backgroundColor: theme.background.default }]}>
      <PostList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 32,
  },
  logoutButton: {
    width: '100%',
    maxWidth: 300,
  },
}); 