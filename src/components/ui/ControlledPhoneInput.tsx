import { useTheme } from "@contexts/ThemeContext";
import React, { forwardRef, ReactNode, Ref, RefObject, useRef, useState } from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormClearErrors,
} from "react-hook-form";
import { StyleSheet, TextInput, View } from "react-native";
import PhoneInput, { PhoneInputProps } from "react-native-phone-number-input";
import AppIcon from "./AppIcon";
import AppText from "./AppText";
import { hs } from "@constants/metrics";

interface Props<T extends FieldValues> extends PhoneInputProps {
  control: Control<T>;
  clearErrors: UseFormClearErrors<T>;
  name: Path<T>;
  title?: string;
  required?: boolean;
  rules?:
    | Omit<
        RegisterOptions<T, Path<T>>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
  children?: ReactNode;
}

const ControlledPhoneInputBase = <T extends FieldValues>(
  {
    control,
    name,
    rules,
    title,
    required = true,
    children,
    clearErrors,
    ...props
  }: Props<T>,
  ref: Ref<PhoneInput>
) => {
  const { colors } = useTheme();
  const localRef = useRef<PhoneInput>(null);
  const phoneInput = (ref as RefObject<PhoneInput>) || localRef;
  
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      // rules={{
      //   required: "Phone number is required",
      //   validate: (value) => {
      //     if (!value) return true;
      //     const isValid = (
      //       phoneInput as RefObject<PhoneInput>
      //     ).current?.isValidNumber(value);
      //     return isValid || "Invalid phone number";
      //   },
      //   ...rules,
      // }}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState: {},
      }) => {
        return (
          <View style={styles.container}>
            {title && <AppText className="ms-2 mb-1">{title}</AppText>}
            <View
              style={[
                styles.inputContainer,
                {
                  borderColor: error
                    ? colors["--error-color"]
                    : isFocused
                    ? colors["--accent-color"]
                    : colors["--border-color"],
                },
              ]}
            >
              {/* @ts-ignore */}
              <PhoneInput
                ref={phoneInput}
                defaultValue={value}
                defaultCode="EG"
                layout="second"
                onChangeText={(text) => {
                  onChange(text);
                  if (error && text !== value) {
                    clearErrors(name);
                  }
                }}
                withDarkTheme
                containerStyle={{
                  ...styles.phoneContainer,
                  backgroundColor: colors["--card-color"],
                }}
                textContainerStyle={{
                  ...styles.textContainer,
                  backgroundColor: colors["--card-color"],
                  paddingStart: hs(2),
                }}
                renderDropdownImage={
                  <AppIcon
                    name="alt-arrow-down"
                    color={colors["--accent-color"]}
                  />
                }
                textInputStyle={{
                  color: colors["--text-primary"],
                }}
                codeTextStyle={{
                  color: colors["--accent-color"],
                }}
                textInputProps={{
                  onFocus: () => setIsFocused(true),
                  onBlur: () => {
                    setIsFocused(false);

                    if (!value || value.length === 0) {
                      if (required) {
                        control.setError(name, {
                          type: "required",
                          message: "Phone number is required",
                        });
                      }
                    } else {
                      const valid = phoneInput.current?.isValidNumber(value);

                      if (!valid) {
                        control.setError(name, {
                          type: "validate",
                          message: "Invalid phone number",
                        });
                      } else {
                        clearErrors(name);
                      }
                    }
                  },
                  placeholderTextColor: colors["--text-muted"],
                  cursorColor: colors["--accent-color"],
                  className: "font-montserrat-light text-[--text-primary]",
                }}
                {...props}
              />
            </View>
            {error && (
              <AppText
                variant="light"
                numberOfLines={1}
                className="pt-2 ps-2 color-[--error-color]"
              >
                {error?.message}
              </AppText>
            )}
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputContainer: {
    borderWidth: 2,
    borderRadius: 12,
    overflow: "hidden",
  },
  phoneContainer: {
    width: "100%",
  },
  textContainer: {
    paddingVertical: 0,
  },
});

const ControlledPhoneInput = forwardRef(ControlledPhoneInputBase) as <
  T extends FieldValues
>(
  props: Props<T> & { ref?: Ref<TextInput> }
) => ReturnType<typeof ControlledPhoneInputBase>;

export default ControlledPhoneInput;
