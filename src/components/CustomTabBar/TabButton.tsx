import { AppText } from "@components/ui";
import { ms } from "@constants/metrics";
import clsx from "clsx";
import React, { FC } from "react";
import { TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";

interface TabButtonProps extends TouchableOpacityProps{
  label: string;
  isFocused: boolean;
  onPress: () => void;
  icon: React.ReactNode;
  iconStyle: ViewStyle;
  colorFocused: string;
  colorUnfocused: string;
}

export const TabButton: FC<TabButtonProps> = ({
  label,
  isFocused,
  onPress,
  icon,
  iconStyle,
  colorFocused,
  colorUnfocused,
  ...props
}) => (
  <TouchableOpacity
    key={label}
    onPress={onPress}
    className="flex-1 items-center justify-center py-2"
    accessible
    accessibilityRole="button"
    accessibilityLabel={`Tab ${label}`}
    accessibilityState={{ selected: isFocused }}
    {...props}
  >
    <Animated.View style={iconStyle}>{icon}</Animated.View>
    <AppText
      variant="light"
      style={{ fontSize: ms(12) }}
      className={clsx(
        "!font-montserrat-light mt-1 text-center",
        isFocused ? colorFocused : colorUnfocused
      )}
    >
      {label}
    </AppText>
  </TouchableOpacity>
);
