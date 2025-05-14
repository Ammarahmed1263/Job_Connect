import * as SecureStore from 'expo-secure-store';

type Key = 'auth_token' | 'refresh_token';

export const secureStorage = {
  async getToken(key: Key): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error('Failed to get token from secure storage', error);
      return null;
    }
  },
  
  async setToken(key: Key, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error('Failed to store token in secure storage', error);
    }
  },
  
  async removeToken(key: Key): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error('Failed to remove token from secure storage', error);
    }
  },
};