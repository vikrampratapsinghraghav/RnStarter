import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useTheme } from '@theme/ThemeContext';
import { useTranslation } from '@localization/useTranslation';
import { I18nManager, View, StyleSheet } from 'react-native';
import { DrawerParamList } from './types';
import { useAuth } from '@screens/auth/context/AuthContext';
import { Text } from '@components/common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

// Import screens
import { TabNavigator } from './TabNavigator';
import { ThemeSettingsScreen } from '@screens/ThemeSettingsScreen';
import { LanguageSettingsScreen } from '@screens/LanguageSettingsScreen';

const Drawer = createDrawerNavigator<DrawerParamList>();

const CustomDrawerContent = (props: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { logout } = useAuth();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={styles.separator} />
      <DrawerItem
        label={t('auth.logout.title')}
        icon={({ color, size }) => (
          <Icon name="logout" size={size} color={color} />
        )}
        onPress={logout}
        labelStyle={{ color: theme.text.primary }}
        style={styles.logoutItem}
      />
    </DrawerContentScrollView>
  );
};

export const DrawerNavigator = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      defaultStatus="closed"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background.default,
        },
        headerTintColor: theme.text.primary,
        drawerStyle: {
          backgroundColor: theme.background.default,
        },
        drawerActiveTintColor: theme.primary.main,
        drawerInactiveTintColor: theme.text.secondary,
        drawerPosition: I18nManager.isRTL ? 'right' : 'left',
      }}>
      <Drawer.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{
          title: t('navigation.home'),
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="ThemeSettings"
        component={ThemeSettingsScreen}
        options={{
          title: t('screens.settings.theme'),
          drawerIcon: ({ color, size }) => (
            <Icon name="palette" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="LanguageSettings"
        component={LanguageSettingsScreen}
        options={{
          title: t('screens.settings.language'),
          drawerIcon: ({ color, size }) => (
            <Icon name="translate" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginVertical: 8,
  },
  logoutItem: {
    marginTop: 0,
  },
});
