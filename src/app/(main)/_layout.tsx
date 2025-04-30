import { Stack, Redirect } from "expo-router";
import React from "react";
import useAuthStore from "@store/authStore";
import { View } from "react-native";
import { AppText } from "@components/ui";

const MainLayout = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-green-500">
        <AppText>Loading...</AppText>
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};

export default MainLayout;
