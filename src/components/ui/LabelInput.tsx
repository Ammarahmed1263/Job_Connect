import { ms } from "@constants/metrics";
import { useTheme } from "@contexts/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { clsx } from "clsx";
import { forwardRef, ReactNode, useRef, useState } from "react";
import {
  NativeSyntheticEvent,
  Pressable,
  StyleProp,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import AppText from "./AppText";

export interface LabelInputProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  containerClassName?: ViewProps["className"];
  pressableClassName?: ViewProps["className"];
  rightComponent?: ({
    passwordVisible,
    focused,
    error,
  }: {
    passwordVisible: boolean;
    focused: boolean;
    error?: string;
  }) => ReactNode;
  leftComponent?: ({
    focused,
    error,
  }: {
    focused: boolean;
    error?: string;
  }) => ReactNode;
  title: string;
  error?: string;
}

const LabelInput = forwardRef<TextInput, LabelInputProps>(
  (
    {
      containerStyle,
      containerClassName,
      pressableClassName,
      rightComponent,
      leftComponent,
      title,
      error,
      onFocus,
      onBlur,
      secureTextEntry = false,
      ...props
    },
    ref
  ) => {
    const { colors } = useTheme();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const localRef = useRef<TextInput>(null);
    const inputRef = (ref as React.RefObject<TextInput>) ?? localRef;

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev);
    };

    return (
      <View
        style={containerStyle}
        className={containerClassName}
        testID="container"
      >
        {title.length > 0 && (
          <AppText className="ms-2 mb-1" testID="label-input-title">
            {title}
          </AppText>
        )}
        <Pressable
          onPress={() => inputRef?.current?.focus()}
          hitSlop={20}
          className={clsx(
            "rounded-xl flex-row items-center justify-between bg-[--card-color] border-2 min-h-12",
            error
              ? "border-[--error-color]"
              : isFocused
              ? "border-[--accent-color]"
              : "border-[--border-color]",
            pressableClassName
          )}
          testID="pressable-container"
        >
          {leftComponent && (
            <View className="ms-3" testID="left-component-container">
              {leftComponent({
                focused: isFocused,
                error,
              })}
            </View>
          )}

          <TextInput
            ref={inputRef}
            placeholderTextColor={colors["--text-muted"]}
            returnKeyType="next"
            autoCapitalize="none"
            cursorColor={colors["--accent-color"]}
            secureTextEntry={secureTextEntry && !isPasswordVisible}
            className="flex-1 text-[--text-primary] min-h-12 font-montserrat-light px-3"
            onFocus={handleFocus}
            onBlur={handleBlur}
            testID="label-input"
            {...props}
          />

          {secureTextEntry ? (
            <Pressable
              onPress={togglePasswordVisibility}
              hitSlop={20}
              className="me-3"
              testID="toggle-visibility" // Added testID for password toggle
            >
              {rightComponent ? (
                rightComponent({
                  passwordVisible: isPasswordVisible,
                  focused: isFocused,
                  error,
                })
              ) : (
                <Ionicons
                  name={!isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                  size={ms(20)}
                  color={isFocused ? colors["--accent-color"] : colors["--text-primary"]}
                  testID={`icon-${
                    !isPasswordVisible ? "eye-off-outline" : "eye-outline"
                  }`}
                />
              )}
            </Pressable>
          ) : null}
        </Pressable>
        {error && (
          <AppText
            variant="light"
            numberOfLines={1}
            className="pt-2 ps-2 color-[--error-color]"
            testID="error-message"
          >
            {error}
          </AppText>
        )}
      </View>
    );
  }
);

export default LabelInput;
