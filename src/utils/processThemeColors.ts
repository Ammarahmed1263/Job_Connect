import { ThemeData } from "@type/theme";
import rgbStringToComponents from "./rgbStringToComponents";

function processThemeColors(theme: ThemeData): ThemeData {
  const processedTheme: ThemeData = {} as ThemeData;

  for (const key in theme) {
    if (Object.prototype.hasOwnProperty.call(theme, key)) {
      const value = theme[key as keyof ThemeData];
      processedTheme[key as keyof ThemeData] = rgbStringToComponents(value);
    }
  }
  return processedTheme;
}

export default processThemeColors;