import { AppText } from "@components/ui";
import { useTheme } from "@contexts/ThemeContext";
import { Filters } from "@type/filterTypes";
import { clsx } from "clsx";
import React, { FC } from "react";
import { Control, Controller } from "react-hook-form";
import { Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

type FilterOption = {
  label: string;
  value: string;
};

interface SegmentedControlFilterProps {
  name: keyof Filters;
  control: Control<Filters>;
  options: FilterOption[];
  allowMultiple?: boolean;
}

const SegmentedControlFilter: FC<SegmentedControlFilterProps> = ({
  name,
  control,
  options,
}) => {

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerClassName="px-4 gap-2 pt-2"
        >
          {options.map((option) => {
            const isSelected = value === option.value;
            return (
              <Pressable
                key={option.value}
                onPress={() => onChange(isSelected ? "" : option.value)}
                className={clsx(
                  "py-2 px-4 rounded-md",
                  isSelected
                    ? "bg-[--accent-color]"
                    : "bg-[--border-color]"
                )}
              >
                <AppText
                  className={clsx(
                    isSelected ? "text-white" : "text-[--bg-color]"
                  )}
                >
                  {option.label}
                </AppText>
              </Pressable>
            );
          })}
        </ScrollView>
      )}
    />
  );
};

export default SegmentedControlFilter;