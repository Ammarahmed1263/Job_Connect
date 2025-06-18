import { useTheme } from "@contexts/ThemeContext";
import useAuthStore from "@store/authStore";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

const MainLayout = () => {
  const { isAuthenticated, isLoading } = useAuthStore();
  const { colors } = useTheme();

  if (!isAuthenticated && !isLoading) {
    console.warn("YOU HAVE BEEN LOGGED OUT");
    return <Redirect href="/login" />;
  }

  return (
    <>
      <StatusBar backgroundColor={colors["--bg-color"]} />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="jobs" />
        <Stack.Screen
          name="complete-profile"
          options={{
            animation: "slide_from_bottom",
          }}
        />
      </Stack>
    </>
  );
};

export default MainLayout;
