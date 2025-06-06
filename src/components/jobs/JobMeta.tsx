import { View, Text } from "react-native";
import React, { FC } from "react";
import { AppIcon, AppText } from "@components/ui";
import { useTheme } from "@contexts/ThemeContext";

interface JobMetaProps {
  location: string;
  postedDate: string;
}

const JobMeta: FC<JobMetaProps> = ({ location, postedDate }) => {
  const { colors } = useTheme();

  return (
    <View className="flex-row justify-between items-center mt-4">
      <View className="flex-row items-center ">
        <AppIcon name="map-point" size={26} color={colors["--accent-color"]} />
        <AppText
          numberOfLines={1}
          variant="light"
          className="ms-1 color-[--text-muted]"
        >
          {location}
        </AppText>
      </View>

      <View>
        <AppText
          numberOfLines={1}
          variant="light"
          className="color-[--text-muted]"
        >
          {postedDate}
        </AppText>
      </View>
    </View>
  );
};

export default JobMeta;
