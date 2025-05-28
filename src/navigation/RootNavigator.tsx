import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthNavigator } from '../screens/auth/navigation/AuthNavigator';
import { useAuth } from '../screens/auth/context/AuthContext';
import AppNavigator from './AppNavigator';
import { DrawerNavigator } from './DrawerNavigator';

// Import your app's main navigator (replace with your actual main navigator)
// import { AppNavigator } from './AppNavigator';

export type RootStackParamList = {
  Auth: undefined;
  App: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <Stack.Screen name="App" component={DrawerNavigator} />
      )}
    </Stack.Navigator>
  );
}; 