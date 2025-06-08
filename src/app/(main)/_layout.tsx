import { AppText } from "@components/ui";
import useAuthStore from "@store/authStore";
import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

const MainLayout = () => {
  const { isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-green-500">
        <AppText>Loading...</AppText>
      </View>
    );
  }

  // if (!isAuthenticated) {
  //   return <Redirect href="/login" />;
  // }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="jobs" options={{title: "Jobs"}}/>
    </Stack>
  );
};

export default MainLayout;
