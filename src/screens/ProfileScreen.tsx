import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useTranslation } from '../localization/useTranslation';
import { Text } from '../components/common';
import { storage } from '@utils/storage';
import { useAuth } from '@screens/auth/context/AuthContext';

interface UserData {
  name: string;
  email: string;
}

export const ProfileScreen = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { logout } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      const data = await storage.getItem('user');
      setUserData(data);
    };
    loadUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background.default }]}>
      <View style={styles.header}>
        <View style={[styles.avatarContainer, { backgroundColor: theme.background.paper }]}>
          <Text style={[styles.avatarText, { color: theme.text.primary }]}>
            {userData?.name ? userData.name[0].toUpperCase() : '?'}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={[styles.infoCard, { backgroundColor: theme.background.paper }]}>
          <Text variant="h3" color={theme.text.primary} style={styles.name}>
            {userData?.name || t('profile.anonymous')}
          </Text>
          <Text variant="body1" color={theme.text.secondary} style={styles.email}>
            {userData?.email || t('profile.noEmail')}
          </Text>
        </View>

       
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  infoCard: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  name: {
    marginBottom: 8,
  },
  email: {
    marginBottom: 4,
  },
  logoutButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
});
