import { ms } from "@constants/metrics";
import { useTheme } from "@contexts/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { clsx } from "clsx";
import { forwardRef, ReactNode, useRef, useState } from "react";
import {
  Pressable,
  StyleProp,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle
} from "react-native";
import AppText from "./AppText";

interface LabelInputProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  containerClassName?: ViewProps["className"];
  title: string;
  error?: string;
  touched?: boolean;
  children?: ReactNode;
}

const LabelInput = forwardRef<TextInput, LabelInputProps>(
  (
    {
      containerStyle,
      containerClassName,
      title,
      children,
      error,
      touched,
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

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev);
    };

    return (
      <View style={containerStyle} className={clsx("mx-2", containerClassName)}>
        <AppText className="ms-2">{title}</AppText>
        <Pressable
          onPress={() => inputRef?.current?.focus()}
          className={clsx(
            "rounded-xl flex-row items-center justify-between bg-[--primary-300] border-2",
            isFocused && !error
              ? "border-[--accent-color]"
              : error && touched
              ? "border-red-500"
              : "border-transparent"
          )}
        >
          <View className="mx-3">{children}</View>
          <TextInput
            ref={inputRef}
            placeholderTextColor={colors["--text-secondary"]}
            returnKeyType="next"
            autoCapitalize="none"
            cursorColor={colors["--accent-color"]}
            secureTextEntry={secureTextEntry && !isPasswordVisible}
            className="flex-1 text-[--text-primary] min-h-22 font-montserrat-light"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          {secureTextEntry && (
            <TouchableOpacity
              className="mx-3"
              onPress={togglePasswordVisibility}
              hitSlop={20}
            >
              <Ionicons
                name={!isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                size={ms(20)}
                color={colors["--text-primary"]}
              />
            </TouchableOpacity>
          )}
        </Pressable>
        {error && touched && (
          <AppText
            variant="light"
            numberOfLines={1}
            className="pt-2 ps-2 color-red-500"
          >
            {error}
          </AppText>
        )}
      </View>
    );
  }
);

export default LabelInput;
