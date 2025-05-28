import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useTheme } from '../theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import { I18nManager } from 'react-native';
import { DrawerParamList } from './types';

// Import screens
import { TabNavigator } from './TabNavigator';
import { ThemeSettingsScreen } from '../screens/ThemeSettingsScreen';
import { LanguageSettingsScreen } from '../screens/LanguageSettingsScreen';

const Drawer = createDrawerNavigator<DrawerParamList>();

export const DrawerNavigator = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <Drawer.Navigator
      defaultStatus="closed"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background.primary,
        },
        headerTintColor: theme.text.primary,
        drawerStyle: {
          backgroundColor: theme.background.primary,
        },
        drawerActiveTintColor: theme.colors.primary,
        drawerInactiveTintColor: theme.text.secondary,
        drawerPosition: I18nManager.isRTL ? 'right' : 'left',
      }}>
      <Drawer.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{
          title: t('navigation.home'),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="ThemeSettings"
        component={ThemeSettingsScreen}
        options={{
          title: t('screens.settings.theme'),
        }}
      />
      <Drawer.Screen
        name="LanguageSettings"
        component={LanguageSettingsScreen}
        options={{
          title: t('screens.settings.language'),
        }}
      />
    </Drawer.Navigator>
  );
};
