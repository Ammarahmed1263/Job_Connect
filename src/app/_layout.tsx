import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "../../global.css";

import ThemeProvider from "@contexts/ThemeContext";
import useAuthStore from "@store/authStore";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Montserrat-Light": require("../assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    // ... other fonts
  });

  const { initializeAuth } = useAuthStore();
  const [appReady, setAppReady] = useState(false);
  console.log('root layout accessed')

  useEffect(() => {
    const prepareApp = async () => {
      if (fontsLoaded) {
        await initializeAuth();
        setAppReady(true);
        SplashScreen.hideAsync();
      }
    };
    prepareApp();
  }, [fontsLoaded]);

  if (!appReady) return null;

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <StatusBar style="auto" />
        <Slot />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}