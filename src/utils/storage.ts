import AsyncStorage from '@react-native-async-storage/async-storage';

export type StorageKey = 'user' | 'theme' | 'settings' | 'auth-token';

export const storage = {
  async get<T>(key: StorageKey): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error reading from storage:', error);
      return null;
    }
  },

  async set(key: StorageKey, value: unknown): Promise<boolean> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error writing to storage:', error);
      return false;
    }
  },

  async remove(key: StorageKey): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from storage:', error);
      return false;
    }
  },

  async clear(): Promise<boolean> {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  },
}; 