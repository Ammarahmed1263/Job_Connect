import { AppText } from "@components/ui";
import { useTheme } from "@contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React, { FC } from "react";
import { View } from "react-native";

interface DetailsBlockProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
}

const DetailsBlock: FC<DetailsBlockProps> = ({ title, icon, value }) => {
  const { colors } = useTheme();

  return (
    <View className="w-[48%] bg-[--card-color] p-4 rounded-xl mb-4">
      <View className="flex-row items-center gap-2 mb-2">
        <Ionicons name={icon} size={20} color={colors["--accent-color"]} />
        <AppText variant="light" className="color-[--text-muted]">
          {title}
        </AppText>
      </View>
      <AppText className="text-center">{value}</AppText>
    </View>
  );
};

export default DetailsBlock;
