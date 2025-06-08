import { ThemeData } from "@type/theme";
import { vars } from "nativewind";

export const colors: { light: ThemeData; dark: ThemeData } = {
  light: {
    "--bg-color": "#FFFFFF",
    "--card-color": "#efefef",
    "--border-color": "#E5E7EB",
    "--text-primary": "#2f2a77",
    "--text-secondary": "#4338CA",
    "--text-muted": "#6B7280",

    "--primary-50": "#6366F1",
    "--primary-100": "#818CF8",
    "--primary-200": "#A5B4FC",
    "--primary-300": "#B7C6FF",
    "--primary-400": "#D2DCFF",
    "--primary-500": "#EEF2FF",

    "--accent-color": "#4F46E5",

    "--success-color": "#10B981",
    "--error-color": "#EF4444",
    "--warning-color": "#F59E0B",
    "--info-color": "#3B82F6",
  },

  dark: {
    "--bg-color": "#121212",
    "--card-color": "#2a2a2a",
    "--border-color": "#6c6c6c",
    "--text-primary": "#D2DCFF",
    "--text-secondary": "#A5B4FC",
    "--text-muted": "#9CA3AF",

    "--primary-50": "#6366F1",
    "--primary-100": "#4F46E5",
    "--primary-200": "#4338CA",
    "--primary-300": "#3730A3",
    "--primary-400": "#312E81",
    "--primary-500": "#1E1B4B",

    "--accent-color": "#818CF8",

    "--success-color": "#34D399",
    "--error-color": "#F87171",
    "--warning-color": "#FBBF24",
    "--info-color": "#60A5FA",
  },
};

export const themes = {
  light: vars<ThemeData>(colors.light),
  dark: vars<ThemeData>(colors.dark),
};
