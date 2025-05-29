import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type TabParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

export type DrawerParamList = {
  MainTabs: undefined;
  LanguageSettings: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  MainTabs: NavigatorScreenParams<TabParamList>;
  Drawer: NavigatorScreenParams<DrawerParamList>;
};

export type RootDrawerParamList = {
  MainTabs: undefined;
  Notifications: undefined;
  Bookmarks: undefined;
  Settings: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Discover: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  Details: { id: string };
};



export type ProfileStackParamList = {
  ProfileScreen: undefined;
  EditProfile: undefined;
  Preferences: undefined;
};

export type BottomTabParamList = {
  HomeTab: undefined;
  ProfileTab: undefined;
  SettingsTab: undefined;
};

export type SettingsStackNavigationProp = NativeStackNavigationProp<DrawerParamList>;

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
