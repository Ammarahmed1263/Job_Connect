import { AppButton, AppIcon, AppText } from "@components/ui";
import { useTheme } from "@contexts/ThemeContext";
import { JobItem } from "@type/jobTypes";
import React from "react";
import { View } from "react-native";

type ExperienceItemProps = {
  item: JobItem;
  onEdit: (experience: any) => void;
  onDelete: (experience: any) => void;
};

const ExperienceItem = ({ item, onEdit, onDelete }: ExperienceItemProps) => {
  const { colors } = useTheme();

  return (
    <View className="p-4 mb-3 border border-[--border-color] rounded-lg bg-[--card-color]">
      <View className="flex-row justify-between items-center mb-2">
        <AppText variant="medium" className="flex-1">
          {item.company?.companyName}
        </AppText>
        <View className="flex-row gap-2">
          <AppButton
            title=""
            flat
            wrapperClassName="!rounded-lg"
            className="!bg-[--border-color]/40 p-2"
            onPress={() => onEdit(item)}
          >
            <AppIcon
              name="pen-round"
              size={20}
              color={colors["--accent-color"]}
            />
          </AppButton>

          <AppButton
            title=""
            flat
            wrapperClassName="!rounded-lg"
            className="!bg-[--border-color]/40 p-2"
            onPress={() => onDelete(item)}
          >
            <AppIcon
              name="trash-bin"
              size={20}
              color={colors["--error-color"]}
            />
          </AppButton>
        </View>
      </View>

      <View className="flex-row items-center mb-1">
        <AppIcon
          name="city"
          size={18}
          color={colors["--text-muted"]}
          style={{ marginRight: 6 }}
        />
        <AppText variant="light" className="text-[--text-muted]">
          {item.workedAs?.jobTitle}
        </AppText>
      </View>
    </View>
  );
};

export default ExperienceItem;
