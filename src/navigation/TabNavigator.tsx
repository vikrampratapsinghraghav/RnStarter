import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../theme/ThemeContext';
import { useTranslation } from '../localization/useTranslation';
import { TabParamList } from './types';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { TouchableOpacity, I18nManager, StyleSheet } from 'react-native';

// Import screens
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation();

  const DrawerButton = () => (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      style={[
        styles.drawerButton,
        { marginLeft: I18nManager.isRTL ? 0 : 16, marginRight: I18nManager.isRTL ? 16 : 0 },
      ]}>
      <Icon name="menu" size={24} color={theme.text.primary} />
    </TouchableOpacity>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.background.default,
          borderTopColor: theme.background.elevated,
        },
        tabBarActiveTintColor: theme.primary.main,
        tabBarInactiveTintColor: theme.text.secondary,
        headerStyle: {
          backgroundColor: theme.background.default,
        },
        headerTintColor: theme.text.primary,
        headerLeft: I18nManager.isRTL ? undefined : () => <DrawerButton />,
        headerRight: I18nManager.isRTL ? () => <DrawerButton /> : undefined,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
          title: t('navigation.home'),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="account" size={size} color={color} />,
          title: t('navigation.profile'),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="cog" size={size} color={color} />,
          title: t('navigation.settings'),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerButton: {
    padding: 8,
  },
});
