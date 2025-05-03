import { colors, themes } from "@constants/Colors";
import { fontFamily } from "@constants/Fonts";
import useThemeProvider from "@hooks/useThemeProvider";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as RNThemeProvider,
} from "@react-navigation/native";
import { Theme, ThemeData } from "@type/theme";
import React, { createContext, useContext, useMemo } from "react";
import { Platform, View } from "react-native";

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

  const contextValue = useMemo(
    () => ({
      theme: actualTheme,
      setTheme,
      colors: colors[actualTheme],
    }),
    [actualTheme]
  );

  const reactNativeTheme: ReactNavigation.Theme = useMemo(
    () => ({
      ...(actualTheme === "dark" ? DarkTheme : DefaultTheme),
      colors: {
        ...(actualTheme === "dark" ? DarkTheme : DefaultTheme).colors,
        primary: colors[actualTheme]["--primary-50"],
        background: colors[actualTheme]["--bg-color"],
        text: colors[actualTheme]["--text-primary"],
        card: colors[actualTheme]["--card-color"],
      },
      fonts: Platform.select({
        ios: {
          regular: {
            fontFamily: fontFamily.regular,
            fontWeight: '400',
          },
          medium: {
            fontFamily: fontFamily.medium,
            fontWeight: '500',
          },
          bold: {
            fontFamily: fontFamily.semiBold,
            fontWeight: '600',
          },
          heavy: {
            fontFamily: fontFamily.bold,
            fontWeight: '700',
          },
        },
        default: {
          regular: {
            fontFamily: fontFamily.regular,
            fontWeight: 'normal',
          },
          medium: {
            fontFamily: fontFamily.medium,
            fontWeight: 'normal',
          },
          bold: {
            fontFamily: fontFamily.semiBold,
            fontWeight: '600',
          },
          heavy: {
            fontFamily: fontFamily.bold,
            fontWeight: '700',
          },
        }
      }),
    }),
    [actualTheme]
  );

  return (
    <View style={[themes[actualTheme]]} className="flex-1">
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
