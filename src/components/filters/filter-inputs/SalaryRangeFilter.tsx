import { ControlledLabelInput } from "@components/ui";
import { Filters } from "@type/filterTypes";
import React from "react";
import { Control, UseFormWatch } from "react-hook-form";
import { View } from "react-native";
import filterRules from "schemas/filter";

interface SalaryRangeFilterProps {
  minSalaryName: keyof Filters;
  maxSalaryName: keyof Filters;
  control: Control<Filters>;
  watch:  UseFormWatch<Filters>;
}

const SalaryRangeFilter: React.FC<SalaryRangeFilterProps> = ({
  minSalaryName,
  maxSalaryName,
  control,
  watch,
}) => {
  const minSalary = watch(minSalaryName) || "";
  const maxSalary = watch(maxSalaryName) || "";
  const rules = filterRules({minSalary, maxSalary});

  return (
    <View className="flex-row justify-between px-2 pt-2">
      <ControlledLabelInput
        control={control}
        name={minSalaryName}
        title="Min Salary"
        placeholder="e.g., 20000"
        keyboardType="numeric"
        containerClassName="flex-1"
        rules={rules.minSalary}
      />
      <ControlledLabelInput
        control={control}
        name={maxSalaryName}
        title="Max Salary"
        placeholder="e.g., 80000"
        keyboardType="numeric"
        containerClassName="flex-1"
        rules={rules.maxSalary}
      />
    </View>
  );
};

export default SalaryRangeFilter;