import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'auth_token';

export const secureStorage = {
  async getToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(TOKEN_KEY);
    } catch (error) {
      console.error('Failed to get token from secure storage', error);
      return null;
    }
  },
  
  async setToken(token: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    } catch (error) {
      console.error('Failed to store token in secure storage', error);
    }
  },
  
  async removeToken(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    } catch (error) {
      console.error('Failed to remove token from secure storage', error);
    }
  },
};