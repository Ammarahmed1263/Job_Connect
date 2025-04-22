import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { preventAutoHideAsync, hideAsync } from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";

import ThemeProvider from "@contexts/ThemeContext";
import { SafeAreaView } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    "Montserrat-Light": require("../assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
  });
  const authorized = false;

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (loaded) {
      hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(main)" redirect={!authorized} />
        <Stack.Screen name="(auth)" redirect={authorized} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
