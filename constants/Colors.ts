/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { ThemeData } from "@type/theme";
import { vars } from "nativewind";

export const colors: {light: ThemeData, dark: ThemeData} = {
  light: {
    "--bg-color": '#FFFFFF',
    "--primary-50": '#EEF2FF',
    "--primary-100": '#E0E7FF',
    "--primary-200": '#C7D2FE',
    "--primary-300": '#A5B4FC',
    "--primary-400": '#818CF8',
    "--primary-500": '#6366F1',
    "--text-primary": '#312E81',
    "--text-secondary": '#4338CA',
    "--accent-color": '#4F46E5',
  },
  dark: {
    "--bg-color": '#121212',
    "--primary-50": '#6366F1',
    "--primary-100": '#4F46E5',
    "--primary-200": '#4338CA',
    "--primary-300": '#3730A3',
    "--primary-400": '#312E81',
    "--primary-500": '#1E1B4B',
    "--text-primary": '#E0E7FF',
    "--text-secondary": '#A5B4FC',
    "--accent-color": '#818CF8',
  }
}

export const themes = {
  light: vars<ThemeData>(colors.light),
  dark: vars<ThemeData>(colors.dark),
}
