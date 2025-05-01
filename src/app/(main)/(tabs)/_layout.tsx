import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@components/HapticTab";
import { IconSymbol } from "@components/ui/IconSymbol";
import TabBarBackground from "@components/ui/TabBarBackground";
import { useTheme } from "@contexts/ThemeContext";

export default function TabLayout() {
  const { colors, theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor:
          colors[theme === 'light'? "--text-primary" : "--primary-50"],
        tabBarInactiveTintColor:
          colors[theme === 'light'? "--primary-50" : "--text-primary"],
        headerTintColor: colors["--text-primary"],
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="map" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="bookmark.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
