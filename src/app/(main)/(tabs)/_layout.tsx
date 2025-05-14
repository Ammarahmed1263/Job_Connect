import { Tabs } from "expo-router";
import React from "react";
import CustomTabBar from "@components/customTabBar";
import AppIcon from "@components/ui/AppIcon";
import { View } from "react-native";
import { useSafeArea } from "@hooks/useSafeArea";

export default function TabLayout() {
  // const { colors, theme } = useTheme();
  const {top, bottom} = useSafeArea();

  return (
    <View style={{paddingTop: top}} className="flex-1">
      <Tabs
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <AppIcon
                name={focused ? "home" : "home-outline"}
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            tabBarIcon: ({ color, focused, size }) => (
              <AppIcon
                name={focused ? "map" : "map-outline"}
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="saved"
          options={{
            title: "Saved",
            tabBarIcon: ({ color, focused }) => (
              <AppIcon
                name={focused ? "bookmark" : "bookmark-outline"}
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, focused, size }) => (
              <AppIcon
                name={focused ? "person" : "person-outline"}
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
