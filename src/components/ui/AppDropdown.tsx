import { useTheme } from "@contexts/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { ReactElement, useState } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";
import AppText from "./AppText";
import { hs, ms, vs } from "@constants/metrics";

interface BaseDropdownItem {
  label: string;
  value: string;
}

interface AppDropdownProps<T extends BaseDropdownItem>
  extends Omit<
    DropdownProps<T>,
    | "onChange"
    | "data"
    | "value"
    | "renderLeftIcon"
    | "renderRightIcon"
    | "renderItem"
  > {
  title?: string;
  label?: string;
  data: T[];
  value: T["value"];
  onChange: (item: T) => void;
  error?: string;

  renderLeftIcon?: (isFocus: boolean) => ReactElement | null;
  renderRightIcon?: (isFocus: boolean) => ReactElement | null;
  renderItem?: (item: T, isSelected: boolean) => ReactElement;

  dropdownStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  placeholderStyle?: StyleProp<TextStyle>;
  selectedTextStyle?: StyleProp<TextStyle>;
  inputSearchStyle?: StyleProp<TextStyle>;

  placeholder?: string;
  searchPlaceholder?: string;
  disableSearch?: boolean;

  focusColor?: string;
  unfocusColor?: string;
}

const AppDropdown = <T extends BaseDropdownItem>({
  title,
  label,
  data,
  value,
  onChange,
  error,
  renderLeftIcon,
  renderRightIcon,
  renderItem,
  dropdownStyle,
  containerStyle,
  placeholderStyle,
  selectedTextStyle,
  inputSearchStyle,
  placeholder = "Select item",
  searchPlaceholder = "Search...",
  disableSearch = false,
  focusColor,
  unfocusColor,
  ...props
}: AppDropdownProps<T>): ReactElement => {
  const [isFocus, setIsFocus] = useState(false);
  const { colors } = useTheme();

  const activeColor = focusColor || colors["--accent-color"];
  const inactiveColor = unfocusColor || colors["--text-primary"];
  const errorColor = colors["--error-color"];

  const defaultRenderItem = (item: T, isSelected: boolean) => (
    <View
      style={{
        padding: hs(12),
        backgroundColor: isSelected
          ? colors["--accent-color"]
          : colors["--bg-color"],
      }}
    >
      <AppText
        variant="light"
        className="!text-lg"
        style={{
          color: isSelected ? colors["--bg-color"] : inactiveColor,
        }}
      >
        {item.label}
      </AppText>
    </View>
  );

  return (
    <View className="flex-1">
      {(title || label) && (
        <View className="flex-row justify-between items-center mb-1">
          <AppText style={{ color: error ? errorColor : inactiveColor }}>
            {title || label}
          </AppText>
          {error && (
            <AppText className="text-sm" style={{ color: errorColor }}>
              {error}
            </AppText>
          )}
        </View>
      )}
      <Dropdown
        style={[
          styles.dropdown,
          {
            borderColor: error
              ? errorColor
              : isFocus
              ? activeColor
              : "transparent",
            backgroundColor: colors["--primary-400"],
          },
          dropdownStyle,
        ]}
        containerStyle={[
          { backgroundColor: colors["--bg-color"] },
          containerStyle,
        ]}
        placeholderStyle={[
          styles.placeholderStyle,
          { color: colors["--text-muted"] },
          placeholderStyle,
        ]}
        selectedTextStyle={[
          styles.selectedTextStyle,
          { color: inactiveColor },
          selectedTextStyle,
        ]}
        inputSearchStyle={[
          styles.inputSearchStyle,
          { color: inactiveColor, backgroundColor: colors["--bg-color"] },
          inputSearchStyle,
        ]}
        data={data}
        maxHeight={300}
        placeholder={!isFocus ? placeholder : "..."}
        searchPlaceholder={searchPlaceholder}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          onChange(item);
          setIsFocus(false);
        }}
        search={!disableSearch}
        renderItem={(item, selected) =>
          renderItem?.(item, selected ?? false) ??
          defaultRenderItem(item, selected ?? false)
        }
        renderLeftIcon={(visible) => renderLeftIcon?.(isFocus) ?? null}
        renderRightIcon={(visible) => renderRightIcon?.(isFocus) ?? null}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: vs(48),
    borderWidth: hs(2),
    borderRadius: hs(8),
    paddingHorizontal: hs(12),
  },
  placeholderStyle: {
    fontSize: ms(14),
  },
  selectedTextStyle: {
    fontSize: ms(14),
  },
  inputSearchStyle: {
    height: vs(40),
    fontSize: ms(14),
    borderRadius: hs(8),
  },
});

export default AppDropdown;
