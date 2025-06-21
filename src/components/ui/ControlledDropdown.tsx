import React from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import AppDropdown from "./AppDropdown";
import { BaseDropdownItem } from "./AppDropdown";

interface ControlledAppDropdownProps<
  T extends BaseDropdownItem,
  TFieldValues extends FieldValues
> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  title?: string;
  data: T[];
  placeholder?: string;
  disableSearch?: boolean;
  focusColor?: string;
  unfocusColor?: string;
  rules?: Record<string, any>;
  dropdownStyle?: any;
  containerStyle?: any;
  placeholderStyle?: any;
  selectedTextStyle?: any;
  inputSearchStyle?: any;
  renderItem?: (item: T, isSelected: boolean) => React.ReactElement;
  renderLeftIcon?: (isFocus: boolean) => React.ReactElement | null;
  renderRightIcon?: (isFocus: boolean) => React.ReactElement | null;
}

function ControlledAppDropdown<
  T extends BaseDropdownItem,
  TFieldValues extends FieldValues
>({
  name,
  control,
  label,
  title,
  data,
  placeholder,
  disableSearch,
  focusColor,
  unfocusColor,
  rules,
  dropdownStyle,
  containerStyle,
  placeholderStyle,
  selectedTextStyle,
  inputSearchStyle,
  renderItem,
  renderLeftIcon,
  renderRightIcon,
}: ControlledAppDropdownProps<T, TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <AppDropdown<T>
          title={title}
          label={label}
          data={data}
          value={value}
          onChange={onChange}
          error={error?.message}
          placeholder={placeholder}
          disableSearch={disableSearch}
          focusColor={focusColor}
          unfocusColor={unfocusColor}
          dropdownStyle={dropdownStyle}
          containerStyle={containerStyle}
          placeholderStyle={placeholderStyle}
          selectedTextStyle={selectedTextStyle}
          inputSearchStyle={inputSearchStyle}
          renderItem={renderItem}
          renderLeftIcon={renderLeftIcon}
          renderRightIcon={renderRightIcon}
          labelField='label'
          valueField='value'
        />
      )}
    />
  );
}

export default ControlledAppDropdown;
