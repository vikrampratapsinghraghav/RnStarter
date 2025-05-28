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
import { store } from '@store';
import { RootNavigator } from '@navigation/RootNavigator';
import { ThemeProvider } from '@theme/ThemeContext';
import { LanguageProvider } from '@localization/LanguageContext';
import { ErrorBoundary } from '@components/common/ErrorBoundary';
import { initI18n } from '@localization/i18n';
import { AuthProvider } from '@screens/auth/context/AuthContext';

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
