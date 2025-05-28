/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import './gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './src/store';
import { ThemeProvider } from './src/theme/ThemeContext';
import { LanguageProvider } from './src/localization/LanguageContext';
import { DrawerNavigator } from './src/navigation/DrawerNavigator';
import { ErrorBoundary } from './src/components/common/ErrorBoundary';
import { SafeAreaProvider } from 'react-native-safe-area-context';

/**
 * Root component that provides theme context and error boundary
 */
const App = () => {
  return (
    <ErrorBoundary>
      <ReduxProvider store={store}>
        <SafeAreaProvider>
          <ThemeProvider>
            <LanguageProvider>
              <NavigationContainer>
                <DrawerNavigator />
              </NavigationContainer>
            </LanguageProvider>
          </ThemeProvider>
        </SafeAreaProvider>
      </ReduxProvider>
    </ErrorBoundary>
  );
};

export default App;
