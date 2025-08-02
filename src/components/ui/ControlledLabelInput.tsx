import React, { ReactNode, Ref, forwardRef } from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormClearErrors
} from "react-hook-form";
import { TextInput } from "react-native";
import LabelInput, { LabelInputProps } from "./LabelInput";

interface Props<T extends FieldValues> extends LabelInputProps {
  control: Control<T>;
  name: Path<T>;
  clearErrors: UseFormClearErrors<T>;
  rules?:
    | Omit<
        RegisterOptions<T, Path<T>>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
  children?: ReactNode;
}

function ControlledLabelInputInner<T extends FieldValues>(
  { control, name, rules, clearErrors, onSubmitEditing, children, ...props }: Props<T>,
  ref: Ref<TextInput>
) {

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => {
        return (
          <LabelInput
            {...props}
            ref={ref}
            value={value ?? ""}
            onChangeText={(text) => {
              onChange(text);
              if (error && text !== value) {
                clearErrors(name);
              }
            }}
            onBlur={(e) => {
              onBlur();
              props.onBlur?.(e);
            }}
            onSubmitEditing={(e) => {
              onSubmitEditing?.(e);
            }}
            error={error?.message}
          >
            {children}
          </LabelInput>
        );
      }}
    />
  );
}

const ControlledLabelInput = forwardRef(ControlledLabelInputInner) as <
  T extends FieldValues
>(
  props: Props<T> & { ref?: Ref<TextInput> }
) => ReturnType<typeof ControlledLabelInputInner>;

export default ControlledLabelInput;
