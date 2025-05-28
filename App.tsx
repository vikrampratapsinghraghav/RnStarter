/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import './gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './src/store';
import { RootNavigator } from './src/navigation/RootNavigator';
import { ThemeProvider } from './src/theme/ThemeContext';
import { LanguageProvider } from './src/localization/LanguageContext';
import { ErrorBoundary } from './src/components/common/ErrorBoundary';
import { initI18n } from './src/localization/i18n';
import { AuthProvider } from './src/screens/auth/context/AuthContext';

/**
 * Initialize i18n configuration
 */
initI18n();

const App = () => {
  return (
    <ErrorBoundary>
      <ReduxProvider store={store}>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <SafeAreaProvider>
                <NavigationContainer>
                  <RootNavigator />
                </NavigationContainer>
              </SafeAreaProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </ReduxProvider>
    </ErrorBoundary>
  );
};

export default App;
