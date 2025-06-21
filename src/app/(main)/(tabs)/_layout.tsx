import { Tabs } from "expo-router";
import React from "react";
import CustomTabBar from "@components/customTabBar";
import { AppIcon } from "@components/ui";
import { View } from "react-native";

export default function TabLayout() {

  return (
    <View className="flex-1">
      <Tabs
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
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
          name="applied"
          options={{
            title: "Applied",
            tabBarIcon: ({ color, focused }) => (
              <AppIcon
                name={focused ? "case" : "case-outline"}
                color={color}
                size={26}
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
