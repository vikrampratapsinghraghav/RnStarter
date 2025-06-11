import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { LoginFormData, SignupFormData } from '../types';
import { storage } from '@utils/storage';
import { LoadingScreen } from '@components/common/LoadingScreen';
import { useTranslation } from '@localization/useTranslation';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  login: (data: LoginFormData) => Promise<void>;
  signup: (data: SignupFormData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. All useState hooks first
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // 2. Memoize translation function to maintain hooks order
  const { t } = useTranslation();
  const translatedInitMessage = React.useMemo(() => t('auth.initializing') as string, [t]);

  // 3. useCallback hooks
  const login = useCallback(async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const userData = {
        email: data.email,
        name: data.email.split('@')[0],
      };
      await storage.setItem('user', userData);
      await storage.setIsAuthenticated(true);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const userData = {
        email: data.email,
        name: data.name,
      };
      await storage.setItem('user', userData);
      await storage.setIsAuthenticated(true);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await storage.clearAuth();
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }, []);

  // 4. useEffect hooks last
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const authenticated = await storage.getIsAuthenticated();
        setIsAuthenticated(authenticated);
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  if (!isInitialized) {
    return <LoadingScreen message={translatedInitMessage} />;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        isInitialized,
        login,
        signup,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
}; 