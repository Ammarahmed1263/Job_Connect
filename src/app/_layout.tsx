import { useFonts } from "expo-font";
import { Slot, SplashScreen, useRouter, useSegments } from "expo-router";
import { preventAutoHideAsync } from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import "../../global.css";

import { AppText } from "@components/ui";
import ThemeProvider from "@contexts/ThemeContext";
import useAuthStore from "@store/authStore";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Montserrat-Light": require("../assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
  });
  const { isAuthenticated, isLoading, initializeAuth } = useAuthStore();
  const appReady = useRef(false);
  console.log('app ready changed: ', appReady.current, fontsLoaded)

  // Hide splash screen once fonts are fontsLoaded
  useEffect(() => {
    (async () => {
      if (fontsLoaded) {
        await initializeAuth();
        appReady.current = true;
        setTimeout(() => {
          SplashScreen.hideAsync();
        });
      }
    })();
  }, [fontsLoaded]);

  if (!fontsLoaded || !appReady) {
    console.log('i was accessed')
    return (
      <View className="flex-1 items-center justify-center bg-red-500">
        <AppText>Loading from app layout...</AppText>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <StatusBar style="auto" />
        <Slot />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}