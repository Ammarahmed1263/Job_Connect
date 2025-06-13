import React from "react";
import { View } from "react-native";
import { AppText } from "@components/ui";
import { useTheme } from "@contexts/ThemeContext";

interface ProfileCompletionProgressProps {
  completed: number;
  total: number;
}

const ProfileCompletionProgress: React.FC<ProfileCompletionProgressProps> = ({
  completed,
  total,
}) => {
  const { colors } = useTheme();
  const progressPercentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <View className="flex-row items-center my-4 px-4 gap-2">
      <View className="flex-1 h-3 bg-[--border-color] rounded-full overflow-hidden">
        <View
          style={{
            width: `${progressPercentage}%`,
            backgroundColor: colors["--accent-color"],
          }}
          className="h-full rounded-full"
        />
      </View>
      <View className="flex-row justify-end items-center">
        <AppText variant="semiBold" className="text-[--text-primary] !text-lg">
          {completed}/{total}
        </AppText>
      </View>
    </View>
  );
};

export default ProfileCompletionProgress;
