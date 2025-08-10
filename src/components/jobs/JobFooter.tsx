import { AppText } from "@components/ui";
import { formatSalary } from "@utils";
import clsx from "clsx";
import React, { FC } from "react";
import { View } from "react-native";

interface JobFooterProps {
  applicationsCount: number;
  minSalary: number;
  maxSalary: number;
  salaryType: string;
}

const JobFooter: FC<JobFooterProps> = ({
  applicationsCount,
  minSalary,
  maxSalary,
  salaryType,
}) => {
  return (
    <View className="flex-row justify-between items-center mt-4 border-t-[1px] border-[--text-muted] pt-4">
      <View className="items-center me-2">
        <View className="flex-row ms-3">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <View
                key={i}
                className={clsx(
                  "w-8 h-8 rounded-full bg-[--accent-color] border-[--bg-color] border-2",
                  "-ml-4"
                )}
              />
            ))}
        </View>
        <AppText
          numberOfLines={1}
          variant="light"
          className="ml-2 color-[--text-muted] !text-sm"
        >
          {applicationsCount
            ? `${applicationsCount} Application${
                applicationsCount > 1 ? "s" : ""
              }`
            : "No Applications yet"}
        </AppText>
      </View>
      <AppText
        variant="light"
        className="flex-1 text-right color-[--text-primary]"
      >
        ${formatSalary(minSalary)}k - ${formatSalary(maxSalary)}k / {salaryType}
      </AppText>
    </View>
  );
};

export default JobFooter;
