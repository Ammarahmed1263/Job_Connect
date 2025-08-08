import { fontFamily, fontVariants } from "@constants/Fonts";
import { hs, ms, vs } from "@constants/metrics";
import { useTheme } from "@contexts/ThemeContext";
import React, { ReactElement, useState } from "react";
import {
  I18nManager,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";
import AppText from "./AppText";
import { applyOpacity } from "@utils";

export interface BaseDropdownItem {
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

  renderLeftIcon?: ({
    isFocused,
  }: {
    isFocused: boolean;
  }) => ReactElement | null;
  renderRightIcon?: ({
    isFocused,
  }: {
    isFocused: boolean;
  }) => ReactElement | null;
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

const isRTL = I18nManager.isRTL;

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
  const [isFocused, setIsFocused] = useState(false);
  const { colors } = useTheme();

  const activeColor = focusColor || colors["--accent-color"];
  const inactiveColor = unfocusColor || colors["--text-primary"];
  const errorColor = colors["--error-color"];

  const defaultRenderItem = (item: T, isSelected: boolean) => (
    <View
      style={{
        padding: hs(12),
        backgroundColor: isSelected
          ? colors["--primary-50"]
          : applyOpacity(colors["--border-color"], 0.5),
      }}
    >
      <AppText
        variant="semiBold"
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
    <>
      {(title || label) && (
        <View style={styles.labelRow}>
          <AppText style={{ color: error ? errorColor : inactiveColor }}>
            {title || label}
          </AppText>
          {error && (
            <AppText style={[styles.errorText, { color: errorColor }]}>
              {" "}
              {error}{" "}
            </AppText>
          )}
        </View>
      )}
      <Dropdown
        inverted={isRTL}
        data={data}
        value={value}
        searchPlaceholder={searchPlaceholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(item) => {
          onChange(item);
          setIsFocused(false);
        }}
        renderItem={(item, selected) =>
          renderItem?.(item, selected ?? false) ??
          defaultRenderItem(item, selected ?? false)
        }
        renderLeftIcon={(visible) =>
          isRTL
          ? renderRightIcon?.({ isFocused: visible ?? false }) ?? null
          : renderLeftIcon?.({ isFocused: visible ?? false }) ?? null
        }
        renderRightIcon={(visible) =>
          isRTL
          ? renderLeftIcon?.({ isFocused: visible ?? false }) ?? null
          : renderRightIcon?.({ isFocused: visible ?? false }) ?? null
        }
        search={!disableSearch}
        maxHeight={300}
        fontFamily={fontFamily.regular}
        style={[
          styles.dropdown,
          {
            borderColor: error
              ? errorColor
              : isFocused
              ? activeColor
              : colors["--border-color"],
            backgroundColor: applyOpacity(colors["--text-muted"], 0.07),
          },
          dropdownStyle,
        ]}
        containerStyle={[
          styles.container,
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
          { color: isFocused ? activeColor : inactiveColor },
          selectedTextStyle,
        ]}
        inputSearchStyle={[
          styles.inputSearchStyle,
          { color: inactiveColor, backgroundColor: colors["--card-color"] },
          inputSearchStyle,
        ]}
        {...props}
      />
    </>
  );
};

const styles = StyleSheet.create({
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: vs(4),
  },
  dropdown: {
    height: vs(48),
    borderWidth: hs(2),
    borderRadius: hs(8),
    paddingHorizontal: hs(12),
  },
  container: {
    borderWidth: 0,
    borderBottomLeftRadius: hs(12),
    borderBottomRightRadius: hs(12),
    overflow: "hidden",
  },
  placeholderStyle: {
    ...fontVariants['regular'],
  },
  selectedTextStyle: {
    ...fontVariants['regular'],
    fontSize: ms(16)
  },
  inputSearchStyle: {
    height: vs(40),
    ...fontVariants['regular'],
    borderRadius: hs(8),
  },
  errorText: {
    fontSize: ms(12),
    marginStart: hs(8),
  },
});

export default AppDropdown;
