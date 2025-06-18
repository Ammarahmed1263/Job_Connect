import { AppButton, AppIcon } from "@components/ui";
import { useTheme } from "@contexts/ThemeContext";
import { useSearchStore } from "@store/searchStore";
import { clsx } from "clsx";
import React, { forwardRef, RefObject, useRef } from "react";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TextInputSubmitEditingEventData,
  View,
} from "react-native";

const SearchBar = forwardRef<TextInput, TextInputProps>(
  ({ onFocus, onBlur, ...props }, ref) => {
    const { colors } = useTheme();
    const {
      searchText,
      barState,
      setBarState,
      setSearchText,
      setSearchHistory,
      clearSearchText,
    } = useSearchStore();
    const internalRef = useRef<TextInput>(null);
    const mergedRef = ref ?? internalRef;
    

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setBarState("focused");
      onFocus?.(e);
    };

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      onBlur?.(e);
    };

    const handleTextChange = (text: string) => {
      setSearchText(text);
    };

    const handleClearButton = () => {
      clearSearchText();
      setBarState("focused");
    };

    const handleSubmit = (
      e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
    ) => {
      const finalText = e.nativeEvent.text.trim();

      if (searchText !== finalText) setSearchText(finalText);
      if (finalText.length > 0) setSearchHistory(finalText);

      setBarState("submitted");
    };

    return (
      <View
        className={clsx(
          "flex-1 rounded-xl flex-row items-center justify-between bg-[--card-color] border-2 min-h-12 px-2",
          barState === "focused"
            ? "border-[--accent-color]"
            : "border-transparent"
        )}
      >
        <AppIcon name="magnifier" size={25} color={colors["--accent-color"]} />
        <TextInput
          ref={mergedRef}
          placeholderTextColor={colors["--text-secondary"]}
          value={searchText}
          onChangeText={handleTextChange}
          onSubmitEditing={handleSubmit}
          returnKeyType="search"
          autoCapitalize="none"
          cursorColor={colors["--accent-color"]}
          className="flex-1 text-[--text-primary] min-h-22 font-montserrat-light px-2"
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {searchText.length > 0 && (
          <AppButton title="" onPress={handleClearButton} flat>
            <AppIcon
              name="close-circle"
              size={26}
              color={colors["--text-muted"]}
            />
          </AppButton>
        )}
      </View>
    );
  }
);

export default SearchBar;
