import React, { createContext, useContext, useState, useCallback } from 'react';
import { LoginFormData, SignupFormData } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginFormData) => Promise<void>;
  signup: (data: SignupFormData) => Promise<void>;
  logout: () => void;
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

  const login = useCallback(async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual login API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // Store auth token here
      // For now, we'll just set isAuthenticated to true
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
      
      // Store auth token here
      // For now, we'll just set isAuthenticated to true
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    // Clear auth token here
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        login,
        signup,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
}; 