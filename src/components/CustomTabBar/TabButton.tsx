import { AppText } from "@components/ui";
import { ms } from "@constants/metrics";
import clsx from "clsx";
import React, { FC } from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import Animated, {
  AnimatedProps,
  AnimatedStyleProp,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

interface TabButtonProps {
  label: string;
  index: number;
  isFocused: boolean;
  onPress: () => void;
  icon: React.ReactNode;
  iconStyle: ViewStyle;
  colorFocused: string;
  colorUnfocused: string;
}

export const TabButton: FC<TabButtonProps> = ({
  label,
  index,
  isFocused,
  onPress,
  icon,
  iconStyle,
  colorFocused,
  colorUnfocused,
}) => (
  <TouchableOpacity
    key={label}
    onPress={onPress}
    className="flex-1 items-center justify-center py-2"
    accessible
    accessibilityRole="button"
    accessibilityLabel={`Tab ${label}`}
    accessibilityState={{ selected: isFocused }}
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
