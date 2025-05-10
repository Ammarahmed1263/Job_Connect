import { useTheme } from "@contexts/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, {
  ReactElement,
  useState
} from "react";
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

interface BaseDropdownItem {
  label: string;
  value: string;
};

interface AppDropdownProps<T extends BaseDropdownItem> extends Omit<DropdownProps<T>, 'onChange' | 'data' | 'value' | 'renderLeftIcon' | 'renderRightIcon' | 'renderItem'> {
  title?: string;
  label?: string;
  data: T[];
  value: T["value"];
  onChange: (item: T) => void;

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

  const defaultRenderItem = (item: T, isSelected: boolean) => (
    <View
      style={{
        padding: 12,
        backgroundColor: isSelected
          ? colors["--primary-100"]
          : colors["--bg-color"],
      }}
    >
      <Text
        style={{
          color: isSelected ? activeColor : inactiveColor,
        }}
      >
        {item.label}
      </Text>
    </View>
  );

  return (
    <View className="flex-1">
      {title && <AppText>{title}</AppText>}
      <Dropdown
        style={[
          styles.dropdown,
          {
            // backgroundColor: colors["--primary-300"],
            borderColor: isFocus ? activeColor : inactiveColor,
          },
          dropdownStyle,
        ]}
        containerStyle={[
          {
            borderRadius: 12,
            overflow: "hidden",
            borderWidth: 0.5,
            borderColor: isFocus ? activeColor : inactiveColor,
          },
          containerStyle,
        ]}
        placeholderStyle={[
          styles.placeholderStyle,
          { color: inactiveColor },
          placeholderStyle,
        ]}
        selectedTextStyle={[
          styles.selectedTextStyle,
          { color: isFocus ? activeColor : inactiveColor },
          selectedTextStyle,
        ]}
        inputSearchStyle={[
          styles.inputSearchStyle,
          { color: inactiveColor },
          inputSearchStyle,
        ]}
        iconStyle={[
          styles.iconStyle,
          {
            tintColor: isFocus ? activeColor : inactiveColor,
          },
        ]}
        showsVerticalScrollIndicator={false}
        data={data}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        search={!disableSearch}
        placeholder={!isFocus ? placeholder : "..."}
        searchPlaceholder={searchPlaceholder}
        onChange={(item: T) => {
          onChange(item);
          setIsFocus(false);
        }}
        renderItem={(item: T) =>
          renderItem
            ? renderItem(item, item.value === value)
            : defaultRenderItem(item, item.value === value)
        }
        renderRightIcon={() =>
          renderRightIcon ? renderRightIcon(isFocus) : (
            <Ionicons
              name="chevron-down"
              size={20}
              color={isFocus ? activeColor : inactiveColor}
            />
          )
        }
        renderLeftIcon={() =>
          renderLeftIcon ? renderLeftIcon(isFocus) : (
            <Ionicons
              name="chevron-down"
              size={20}
              color={isFocus ? activeColor : inactiveColor}
              style={{ marginRight: 5 }}
            />
          )
        }
        {...props}
      />
    </View>
  );
};

export default AppDropdown;

const styles = StyleSheet.create({
  dropdown: {
    minHeight: 45,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 2,
  },
  label: {
    position: "absolute",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});