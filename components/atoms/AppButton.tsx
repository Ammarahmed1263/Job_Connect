import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { FC, useState } from "react";
import { FontVariants } from "@constants/Fonts";
import AppText from "./AppText";
import { hs } from "@constants/metrics";
import clsx from "clsx";
import { useTheme } from "@contexts/ThemeContext";
import { isIos } from "@constants/index";

interface Props extends PressableProps {
  title: string;
  flat?: boolean;
  variant?: "primary" | "secondary";
  textvariant?: FontVariants;
  onPress: () => void;
}
const AppButton: FC<Props> = ({
  title,
  flat = false,
  style,
  variant = "secondary",
  textvariant = "medium",
  ...props
}) => {
  const [pressed, setPressed] = useState(false);
  const { colors } = useTheme();

  return (
    <View
      className={clsx(
        "rounded-lg overflow-hidden ",
        variant === "primary" ? "bg-[--primary-300]" : "bg-[--primary-100]"
      )}
      style={
        flat
          ? { backgroundColor: "transparent" }
          : [styles.shadow, { shadowColor: colors["--accent-color"] }]
      }
    >
      <Pressable
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        className={clsx(
          `items-center justify-center`,
          pressed && isIos && "bg-[--accent-color]",
          flat && pressed && "opacity-50"
        )}
        android_ripple={!flat ? { color: colors["--accent-color"] } : null}
        style={!flat && styles.shadow}
        hitSlop={20}
        {...props}
      >
        <AppText
          variant={textvariant}
          className={clsx("color-[--text-primary] px-4 py-2")}
        >
          {title}
        </AppText>
      </Pressable>
    </View>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  shadow: {
    elevation: 25,
    shadowOffset: { width: 2, height: 8 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
  },
});
