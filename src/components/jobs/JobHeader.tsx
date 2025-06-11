import { AppIcon, AppText } from "@components/ui";
import { useTheme } from "@contexts/ThemeContext";
import { jobSummary } from "@type/jobTypes";
import React, { FC, ReactNode } from "react";
import { Pressable, View } from "react-native";

interface JobHeaderProps {
  item: jobSummary;
  rightComponent?: ReactNode;
  isSaved?: boolean;
  onToggleSave?: () => void;
}

const JobHeader: FC<JobHeaderProps> = ({
  item,
  rightComponent,
  isSaved,
  onToggleSave,
}) => {
  const { colors } = useTheme();

  return (
    <View className="flex-row justify-between items-center">
      <View className="flex-row gap-3 flex-1 ">
        <View className="w-16 aspect-square bg-app-accent rounded-xl items-center justify-center">
          <AppText variant="bold" className="color-[--bg-color] leading-tight">
            {item?.employer?.companyName[0].toUpperCase()}.
          </AppText>
        </View>
        <View className="flex-1 pe-2">
          <AppText numberOfLines={1} variant="medium">
            {item.title}
          </AppText>
          <AppText
            numberOfLines={1}
            variant="light"
            className="text-sm color-[--text-muted]"
          >
            {item?.employer?.companyName}
          </AppText>
        </View>
      </View>

      {rightComponent ?? (
        <Pressable onPress={onToggleSave} hitSlop={10}>
          <AppIcon
            name={isSaved ? "bookmark" : "bookmark-outline"}
            color={colors["--accent-color"]}
            size={26}
          />
        </Pressable>
      )}
    </View>
  );
};

export default JobHeader;
