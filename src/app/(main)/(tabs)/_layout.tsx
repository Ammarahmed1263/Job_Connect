import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@components/HapticTab";
import { IconSymbol } from "@components/ui/IconSymbol";
import TabBarBackground from "@components/ui/TabBarBackground";
import { useTheme } from "@contexts/ThemeContext";
import CustomTabBar from "@components/CustomTabBar";

export default function TabLayout() {
  const { colors, theme } = useTheme();

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={24} name={focused ? "home" : "home-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={24} name={focused ? "map" : "map-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={24} name={focused ? "bookmark" : "bookmark-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={24} name={focused ? "person" : "person-outline"} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
