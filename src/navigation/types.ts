export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
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

export type DiscoverStackParamList = {
  DiscoverScreen: undefined;
  CategoryDetails: { category: string };
};

export type ProfileStackParamList = {
  ProfileScreen: undefined;
  EditProfile: undefined;
  Preferences: undefined;
}; 