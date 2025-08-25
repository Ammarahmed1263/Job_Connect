import { Stack } from "expo-router";
import React from "react";
import { Platform } from "react-native";

const CompleteProfileLayout = () => {

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: Platform.OS === "ios" ? "ios_from_left" : "slide_from_left",
      }}
    />
  );
};

export default CompleteProfileLayout;
