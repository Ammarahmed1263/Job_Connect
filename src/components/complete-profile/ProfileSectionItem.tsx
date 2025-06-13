import { AppIcon, AppText } from "@components/ui";
import { useTheme } from "@contexts/ThemeContext";
import { ProfileSection } from "@type/profileSections";
import React, { FC } from "react";
import { TouchableOpacity, View } from "react-native";

interface ProfileSectionItemProps {
  item: ProfileSection;
  onPress: () => void;
  isCompleted?: boolean;
  fieldsCount?: number;
}

const ProfileSectionItem: FC<ProfileSectionItemProps> = ({
  item,
  isCompleted,
  fieldsCount,
  onPress,
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center bg-[--card-color] p-4 rounded-xl mb-3 mx-4 shadow-sm"
    >
      <View
        className="w-12 h-12 rounded-full items-center justify-center"
        style={{ backgroundColor: colors["--accent-color"] }}
      >
        <AppIcon name={item.iconName} size={24} color={colors["--bg-color"]} />
      </View>
      <AppText className="flex-1 text-[--text-primary] ms-2 mt-1">
        {item.sectionName}
      </AppText>

      {isCompleted ? (
        <AppIcon
          name="checkmark"
          size={28}
          color={colors["--text-secondary"]}
        />
      ) : (
        <View className="flex-row items-center justify-center">
          <AppText variant="light" className="!text-[--text-secondary] !text-lg mt-1">
            {fieldsCount}
          </AppText>
          <AppIcon
            name="alt-arrow-right"
            size={28}
            color={colors["--text-muted"]}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ProfileSectionItem;
