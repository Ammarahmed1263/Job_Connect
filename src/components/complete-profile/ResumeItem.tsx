import { AppButton, AppIcon, AppText } from "@components/ui";
import { useTheme } from "@contexts/ThemeContext";
import { useDeleteResume } from "@queries/resumeQueries";
import { Resume } from "@type/userTypes";
import { downloadResume, handleDownloadResume } from "@utils";
import React from "react";
import { TouchableOpacity, View } from "react-native";

type ResumeItemProps = {
  item: Resume;
};

const ResumeItem = ({ item }: ResumeItemProps) => {
  const { colors } = useTheme();
  const {mutateAsync} = useDeleteResume();

  return (
    <TouchableOpacity
      className="flex-row items-center justify-between p-4 ps-2 gap-4"
      onPress={() => downloadResume(item.resumePath, item.resumeName)}
    >
      <AppText className="flex-1" numberOfLines={1}>
        {item.resumeName}
      </AppText>
      <View className="flex-row gap-2 justify-center align-center">
        <AppButton
          title=""
          flat
          wrapperClassName="!rounded-lg"
          className="!bg-[--border-color]/40 p-2"
          onPress={() => handleDownloadResume(item.resumePath, item.resumeName)}
        >
          <AppIcon name="share" color={colors["--accent-color"]} />
        </AppButton>

        <AppButton
          title=""
          flat
          wrapperClassName="!rounded-lg"
          className="!bg-[--border-color]/40 p-2"
          onPress={() => mutateAsync(item.id)}
        >
          <AppIcon name="trash-bin" color={colors["--error-color"]} />
        </AppButton>
      </View>
    </TouchableOpacity>
  );
};

export default ResumeItem;
