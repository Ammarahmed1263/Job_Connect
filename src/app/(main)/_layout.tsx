import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";

const MainLayout = () => {
  // const [shouldRedirect, setShouldRedirect] = useState(false);

  
  // useEffect(() => {
  //   if (!isAuthenticated && !isLoading) {
  //     console.warn("YOU HAVE BEEN LOGGED OUT");
  //     setShouldRedirect(true);
  //   }
  // }, [isAuthenticated, isLoading]);

  // if (shouldRedirect) {
  //   return <Redirect href="/login" />;
  // }

  return (
    <View className="flex-1 color-[--bg-color]">
      <StatusBar />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="jobs" />
        <Stack.Screen
          name="complete-profile"
          options={{
            animation: "slide_from_bottom",
          }}
        />
      </Stack>
    </View>
  );
};

export default MainLayout;
