import { Tabs } from "expo-router";
import React from "react";

import CustomTabBar from "@components/CustomTabBar";
import AppIcon from "@components/ui/AppIcon";

export default function TabLayout() {
  // const { colors, theme } = useTheme();

  return (
    <Tabs tabBar={(props) => <CustomTabBar {...props} />}>
      <Tabs.Screen
        name="index"
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
  );
}
