import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";

export default function AuthLayout() {

  return (
    <View className="flex-1 color-[--bg-color]">
      <StatusBar />
      <Stack
        screenOptions={{
          headerShown: false,
          // animation:  'none',
        }}
      >
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
      </Stack>
    </View>
  );
}
