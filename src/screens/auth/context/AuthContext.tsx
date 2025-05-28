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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { t } = useTranslation();

  // Initialize auth state from storage
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

  const login = useCallback(async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual login API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // Store auth state
      await storage.setIsAuthenticated(true);
      // You would typically also store the token here
      // await storage.setAuthToken(response.token);
      
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
      // TODO: Implement actual signup API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // Store auth state
      await storage.setIsAuthenticated(true);
      // You would typically also store the token here
      // await storage.setAuthToken(response.token);
      
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
      // Clear all auth data from storage
      await storage.clearAuth();
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }, []);

  // Don't render children until auth is initialized
  if (!isInitialized) {
    return <LoadingScreen message={t('auth.initializing')} />;
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