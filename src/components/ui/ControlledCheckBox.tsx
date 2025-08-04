import React from "react";
import {
    Control,
    Controller,
    FieldValues,
    Path,
    RegisterOptions
} from "react-hook-form";
import { StyleProp, ViewStyle } from "react-native";
import Checkbox from "./CheckBox";

interface Props<T extends FieldValues> {
  control?: Control<T>;
  name: Path<T>;
  rules?:
    | Omit<
        RegisterOptions<T, Path<T>>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
  disabled?: boolean;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

function ControlledCheckBox<T extends FieldValues>({
  control,
  name,
  rules,
  disabled,
  size,
  style,
}: Props<T>) {

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange } }) => (
        <Checkbox
          checked={!!value}
          onToggle={() => onChange(!value)}
          disabled={disabled}
          size={size}
          style={style}
        />
      )}
    />
  );
}

export default ControlledCheckBox;
