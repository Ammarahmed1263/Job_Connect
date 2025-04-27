import { useFonts } from "expo-font";
import { Slot, Stack, useRouter, useSegments } from "expo-router";
import { preventAutoHideAsync, hideAsync } from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "../../global.css";

import ThemeProvider from "@contexts/ThemeContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

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
  const [user, setUser] = useState("");
  const [appReady, setAppReady] = useState(false);
  const segments = useSegments()[0];
  const router = useRouter();
  const authorized = false;

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (loaded) {
      hideAsync();
      setAppReady(true);
    }
  }, [loaded]);

  // useEffect(() => {
  //   if (!appReady) return;

  //   const isLoggedIn = !!user;

  //   if (isLoggedIn && segments === "(auth)") {
  //     router.replace("/");
  //   } else if (!isLoggedIn && segments !== "(auth)") {
  //     router.replace("/(auth)/login");
  //   }
  // }, [appReady, user]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
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
        {/* <Slot /> */}
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
