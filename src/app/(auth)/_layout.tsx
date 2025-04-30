import { Redirect, Stack } from 'expo-router';
import React from 'react';
import useAuthStore from '@store/authStore';

const AuthLayout = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Redirect href="/" />;
  }

  return (
    <Stack screenOptions={{
      headerShown: false,
      // animation: 'none'
    }}>
      <Stack.Screen name='login' />
      <Stack.Screen name='register' />
    </Stack>
  )
}

export default AuthLayout;