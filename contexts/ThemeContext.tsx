import { colors, themes } from "@constants/Colors";
import useThemeProvider from "@hooks/useThemeProvider";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as RNThemeProvider,
} from "@react-navigation/native";
import { Theme, ThemeData } from "@type/theme";
import { useColorScheme as useNWColorScheme} from "nativewind";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Appearance,
  useColorScheme,
  View,
} from "react-native";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  colors: ThemeData;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {},
  colors: colors["light"],
});

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { deviceTheme, setTheme, actualTheme } = useThemeProvider();

  if (!deviceTheme || !actualTheme) {
   return null;
  }

  const contextValue = {
    theme: actualTheme,
    setTheme,
    colors: colors[actualTheme],
  };

  const reactNativeTheme = {
    ...(actualTheme === "dark" ? DarkTheme : DefaultTheme),
    colors: {
      ...(actualTheme === "dark" ? DarkTheme : DefaultTheme).colors,
      primary: colors[actualTheme]["--primary-50"],
      background: colors[actualTheme]["--bg-color"],
      text: colors[actualTheme]["--text-primary"],
      card: colors[actualTheme]["--primary-400"],
    },
  };


  return (
    <View style={themes[actualTheme]} className="flex-1">
      <ThemeContext.Provider value={contextValue}>
        <RNThemeProvider value={reactNativeTheme}>{children}</RNThemeProvider>
      </ThemeContext.Provider>
    </View>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default ThemeProvider;
