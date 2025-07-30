import ThemeProvider from "@contexts/ThemeContext";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import queryClient from "@queries/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import * as Notifications from "expo-notifications";
import { Slot, SplashScreen } from "expo-router";
import * as SystemUI from "expo-system-ui";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";
import "../../global.css";
import { NotificationProvider } from "../contexts/NotificationContext";

// Enable native screens implementation for better performance
enableScreens();

// to solve white background flash issue
SystemUI.setBackgroundColorAsync("transparent");
SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldShowAlert: true,
  }),
});

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <NotificationProvider>
            <BottomSheetModalProvider>
              <SafeAreaProvider>
                <Slot />
              </SafeAreaProvider>
            </BottomSheetModalProvider>
          </NotificationProvider>
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
