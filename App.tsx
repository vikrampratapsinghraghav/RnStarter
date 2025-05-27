/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import './gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { ThemeProvider } from './src/theme/ThemeContext';
import { LanguageProvider } from './src/localization/LanguageContext';
import { DrawerNavigator } from './src/navigation/DrawerNavigator';
import { ErrorBoundary } from './src/components/common/ErrorBoundary';

/**
 * Root component that provides theme context and error boundary
 */
const App = () => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <LanguageProvider>
          <ThemeProvider>
            <NavigationContainer>
              <DrawerNavigator />
            </NavigationContainer>
          </ThemeProvider>
        </LanguageProvider>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
