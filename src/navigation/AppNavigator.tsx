import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HomeScreen } from '../screens/home/HomeScreen';

export type AppStackParamList = {
  Home: undefined;
  Settings: undefined;
};

const Drawer = createDrawerNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerActiveTintColor: '#f4511e',
        drawerInactiveTintColor: '#666',
        drawerLabelStyle: {
          fontSize: 16,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          drawerIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppNavigator;
