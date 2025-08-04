import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import AppIcon from "./AppIcon";
import { ms } from "@constants/metrics";
import { useTheme } from "@contexts/ThemeContext";

interface Props {
  checked: boolean;
  onToggle: () => void;
  size?: number;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

const CheckBox = ({ checked, onToggle, size = 20, style, disabled }: Props) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onToggle}
      disabled={disabled}
      hitSlop={20}
      activeOpacity={0.8}
      style={[
        styles.box,
        {
          width: size,
          height: size,
          borderColor: checked
            ? colors["--primary-50"]
            : colors["--text-muted"],
          backgroundColor: checked ? colors["--primary-50"] : "transparent",
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {checked && (
        <AppIcon
          name="check"
          size={size}
          color={colors["--bg-color"]}
        />
      )}
    </TouchableOpacity>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  box: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: ms(2),
    borderRadius: ms(6),
    overflow: "hidden",
  },
});
