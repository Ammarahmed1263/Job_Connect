import { useColorScheme } from "react-native";
import { useColorScheme as useNWColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { Theme } from "@type/theme";

const useThemeProvider = () => {
  const deviceTheme = useColorScheme();
  const { setColorScheme } = useNWColorScheme();
  const [preferredTheme, setPreferredTheme] = useState<Theme>("system");
  const actualTheme = preferredTheme === "system" ? deviceTheme : preferredTheme;

  useEffect(() => {
    if (deviceTheme) {
      setPreferredTheme(deviceTheme ?? 'dark');
    }
  }, [deviceTheme]);

  const setTheme = (newTheme: Theme) => {
    setPreferredTheme(newTheme);
    setColorScheme(newTheme);
  };

  return {
    actualTheme,
    deviceTheme,
    setTheme,
  }
}

export default useThemeProvider;