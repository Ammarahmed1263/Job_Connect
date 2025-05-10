import { FontVariants } from "@constants/Fonts";
import { isIos } from "@constants/index";
import { useTheme } from "@contexts/ThemeContext";
import clsx from "clsx";
import React, { ElementRef, forwardRef, useState } from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  TextProps,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import AppText from "./AppText";

interface Props extends PressableProps {
  title: string;
  flat?: boolean;
  variant?: "primary" | "secondary";
  textVariant?: FontVariants;
  textClassName?: TextProps["className"];
  wrapperStyle?: StyleProp<ViewStyle>;
  wrapperClassName?: ViewProps["className"];
  onPress: () => void;
  children?: React.ReactNode;
}

const AppButton = forwardRef<ElementRef<typeof Pressable>, Props>(
  (
    {
      title,
      flat = false,
      onPress,
      style,
      variant = "primary",
      textVariant = "regular",
      textClassName,
      wrapperStyle,
      wrapperClassName,
      children,
      ...props
    },
    ref
  ) => {
    const [pressed, setPressed] = useState(false);
    const { colors } = useTheme();

    const handlePress = () => {
      onPress();
    };

    return (
      <View
        ref={ref}
        className={clsx(
          "rounded-xl overflow-hidden",
          variant === "primary" ? "bg-[--primary-100]" : "bg-[--primary-300]",
          wrapperClassName
        )}
        style={[
          !flat && { ...styles.shadow, shadowColor: colors["--accent-color"] },
          flat && { backgroundColor: "transparent" },
          wrapperStyle,
        ]}
      >
        <Pressable
          onPressIn={() => setPressed(true)}
          onPressOut={() => setPressed(false)}
          onPress={handlePress}
          android_ripple={!flat ? { color: colors["--accent-color"] } : null}
          style={!flat && styles.shadow}
          hitSlop={20}
          {...props}
          className={clsx(
            "items-center justify-center",
            pressed && isIos && "bg-[--accent-color]",
            flat && pressed && "opacity-50",
            props?.className
          )}
        >
          {children ? children : (
            <AppText
              variant={textVariant}
              className={clsx(
                flat &&
                  (variant === "primary"
                  ? "text-[--text-primary]"
                  : "text-[--text-secondary]"),
              !flat && "px-4 py-2 !text-[--bg-color]",
              textClassName
            )}
          >
            {title}
          </AppText>
          )}
        </Pressable>
      </View>
    );
  }
);

export default AppButton;

const styles = StyleSheet.create({
  shadow: {
    elevation: 16,
    shadowOffset: { width: 2, height: 6 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
  },
});
