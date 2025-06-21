import { useTheme } from "@contexts/ThemeContext";
import { Stack } from "expo-router";
import React from "react";

export default function AuthLayout() {
  const { colors } = useTheme();

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          // animation:  'none',
        }}
      >
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
      </Stack>
    </>
  );
}
