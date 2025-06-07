import ThemeProvider from "@contexts/ThemeContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { Slot, SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import queryClient from "@queries/queryClient";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../../global.css";

// to solve white background flash issue
SystemUI.setBackgroundColorAsync("transparent");
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ThemeProvider>
          <StatusBar style="auto" />
          <Slot />
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
