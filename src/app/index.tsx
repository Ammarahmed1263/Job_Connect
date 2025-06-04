import "@api/interceptors";
import useAuthStore from "@store/authStore";
import { useOnboardingStore } from "@store/onboardingStore";
import { useFonts } from "expo-font";
import { Redirect, SplashScreen, useRootNavigationState } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const { initializeAuth, isLoading } = useAuthStore();
  const {isOnboardingCompleted} = useOnboardingStore();
  console.log('onboarding: ', isOnboardingCompleted);
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

  if (!isOnboardingCompleted) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/explore" />;
}
