import { ThemeData } from "@type/theme";
import { processThemeColors } from "@utils";
import { vars } from "nativewind";

export const colors: { light: ThemeData; dark: ThemeData } = {
  light: {
    "--bg-color": "rgb(255, 255, 255)",
    "--card-color": "rgb(239, 239, 239)",
    "--border-color": "rgb(224, 224, 244)",
    "--text-primary": "rgb(47, 42, 119)",
    "--text-secondary": "rgb(67, 56, 202)",
    "--text-muted": "rgb(107, 114, 128)",
    "--primary-50": "rgb(99, 102, 241)",
    "--primary-100": "rgb(129, 140, 248)",
    "--primary-200": "rgb(165, 180, 252)",
    "--primary-300": "rgb(183, 198, 255)",
    "--primary-400": "rgb(210, 220, 255)",
    "--primary-500": "rgb(238, 242, 255)",
    "--accent-color": "rgb(79, 70, 229)",
    "--success-color": "rgb(16, 185, 129)",
    "--error-color": "rgb(239, 68, 68)",
    "--warning-color": "rgb(245, 158, 11)",
    "--info-color": "rgb(59, 130, 246)"
  },
  dark: {
    "--bg-color": "rgb(18, 18, 18)",
    "--card-color": "rgb(30, 30, 30)",
    "--border-color": "rgb(58, 58, 58)",
    "--text-primary": "rgb(210, 220, 255)",
    "--text-secondary": "rgb(165, 180, 252)",
    "--text-muted": "rgb(156, 163, 175)",
    "--primary-50": "rgb(99, 102, 241)",
    "--primary-100": "rgb(79, 70, 229)",
    "--primary-200": "rgb(67, 56, 202)",
    "--primary-300": "rgb(55, 48, 163)",
    "--primary-400": "rgb(49, 46, 129)",
    "--primary-500": "rgb(30, 27, 75)",
    "--accent-color": "rgb(129, 140, 248)",
    "--success-color": "rgb(52, 211, 153)",
    "--error-color": "rgb(248, 113, 113)",
    "--warning-color": "rgb(251, 191, 36)",
    "--info-color": "rgb(96, 165, 250)"
  }
};

export const themes = {
  light: vars<ThemeData>(processThemeColors(colors.light)),
  dark: vars<ThemeData>(processThemeColors(colors.dark)),
};
