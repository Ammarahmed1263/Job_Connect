import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";


type Props = {};

const MainLayout = (props: Props) => {
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
