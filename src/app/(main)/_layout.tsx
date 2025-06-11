import useAuthStore from "@store/authStore";
import { Redirect, Stack } from "expo-router";
import React from "react";

const MainLayout = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    console.error("YOU HAVE BEEN LOGGED OUT");
    return <Redirect href="/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="jobs" />
    </Stack>
  );
};

export default MainLayout;
