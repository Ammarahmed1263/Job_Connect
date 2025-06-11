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
  rightComponent?: (passwordVisible: boolean) => ReactNode;
  leftComponent?: () => ReactNode;
  title: string;
  error?: string;
}

const LabelInput = forwardRef<TextInput, LabelInputProps>(
  (
    {
      containerStyle,
      containerClassName,
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
      <View style={containerStyle} className={clsx("mx-2", containerClassName)}>
        {title.length > 0 && <AppText className="ms-2">{title}</AppText>}
        <Pressable
          onPress={() => inputRef?.current?.focus()}
          hitSlop={20}
          className={clsx(
            "rounded-xl flex-row items-center justify-between bg-[--primary-400] border-2 min-h-12",
            error
              ? "border-[--error-color]"
              : isFocused
              ? "border-[--accent-color]"
              : "border-transparent"
          )}
        >
          {leftComponent && <View className="mx-3">{leftComponent()}</View>}

          <TextInput
            ref={inputRef}
            placeholderTextColor={colors["--text-secondary"]}
            returnKeyType="next"
            autoCapitalize="none"
            cursorColor={colors["--accent-color"]}
            secureTextEntry={secureTextEntry && !isPasswordVisible}
            className="flex-1 text-[--text-primary] min-h-22 font-montserrat-light px-2"
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />

          {secureTextEntry ? (
            <Pressable
              onPress={togglePasswordVisibility}
              hitSlop={20}
              className="mx-3"
            >
              {rightComponent ? (
                <>{rightComponent(isPasswordVisible)}</>
              ) : (
                <Ionicons
                  name={!isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                  size={ms(20)}
                  color={colors["--text-primary"]}
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
          >
            {error}
          </AppText>
        )}
      </View>
    );
  }
);

export default LabelInput;
