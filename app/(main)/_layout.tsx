import { Stack } from "expo-router";
import React from "react";
import { Platform, StyleSheet, useColorScheme } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";

type Props = {};

const MainLayout = (props: Props) => {
  const colorScheme = useColorScheme();
  // const user = true;

  // if (!user) {
  //   return <Redirect href="/(auth)/login" />;
  // }

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

const styles = StyleSheet.create({});
