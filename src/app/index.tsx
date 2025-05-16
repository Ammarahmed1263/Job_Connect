import { Redirect, useRootNavigationState } from "expo-router";
import useAuthStore from "@store/authStore";
import "@api/interceptors";
import { View } from "react-native";
import { AppText } from "@components/ui";
import { useEffect } from "react";
import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";

export default function Index() {
  const { initializeAuth, hasCompletedOnboarding, isLoading } = useAuthStore();
  const rootNavigationState = useRootNavigationState();
  const [fontsLoaded] = useFonts({
    "Montserrat-Light": require("@assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Regular": require("@assets/fonts/Montserrat-Regular.ttf"),
  });
  console.log("states: ", fontsLoaded, rootNavigationState?.key, isLoading);

  useEffect(() => {
    (async () => {
      try {
        if (fontsLoaded) {
          await initializeAuth();

          if (rootNavigationState?.key && !isLoading) {
            await SplashScreen.hideAsync();
          }
        }
      } catch (error) {
        console.error("Error preparing app:", error);
      }
    })();
  }, [fontsLoaded, rootNavigationState?.key, isLoading]);

  if (isLoading || !rootNavigationState?.key || !fontsLoaded) {
    return null;
  }

  if (!hasCompletedOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/home" />;
}
