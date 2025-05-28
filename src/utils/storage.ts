import AsyncStorage from '@react-native-async-storage/async-storage';

export type StorageKey = 'user' | 'theme' | 'settings' | 'auth-token' | 'is-authenticated' | 'theme-mode';

const STORAGE_KEYS = {
  IS_AUTHENTICATED: 'is-authenticated',
  AUTH_TOKEN: 'auth-token',
  USER_DATA: 'user',
  THEME_MODE: 'theme-mode',
} as const;

export const storage = {
  getItem: async (key: StorageKey) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error reading from storage:', error);
      return null;
    }
  },

  setItem: async (key: StorageKey, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error writing to storage:', error);
      return false;
    }
  },

  removeItem: async (key: StorageKey) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from storage:', error);
      return false;
    }
  },

  // Auth specific methods
  setIsAuthenticated: async (value: boolean) => {
    return storage.setItem(STORAGE_KEYS.IS_AUTHENTICATED, value);
  },

  getIsAuthenticated: async () => {
    return storage.getItem(STORAGE_KEYS.IS_AUTHENTICATED) || false;
  },

  setAuthToken: async (token: string) => {
    return storage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  },

  getAuthToken: async () => {
    return storage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  clearAuth: async () => {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.IS_AUTHENTICATED,
        STORAGE_KEYS.AUTH_TOKEN,
        STORAGE_KEYS.USER_DATA,
      ]);
      return true;
    } catch (error) {
      console.error('Error clearing auth data:', error);
      return false;
    }
  },
};
