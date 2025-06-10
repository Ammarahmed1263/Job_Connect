import ThemeProvider from "@contexts/ThemeContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { Slot, SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import queryClient from "@queries/queryClient";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../../global.css";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";

// to solve white background flash issue
SystemUI.setBackgroundColorAsync("transparent");
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <BottomSheetModalProvider>
            <SafeAreaProvider>
              <StatusBar style="auto" />
              <Slot />
            </SafeAreaProvider>
          </BottomSheetModalProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
