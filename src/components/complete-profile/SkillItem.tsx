import React, { FC } from "react";
import { Pressable, View } from "react-native";
import { AppIcon, AppText } from "@components/ui";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { useTheme } from "@contexts/ThemeContext";
import { Skill } from "@type/userTypes";

interface SkillItemProps {
  skill: Skill;
  index: number;
  onEdit: (index: number, skill: string) => void;
  onRemove: (index: number) => void;
}

const SkillItem: FC<SkillItemProps> = ({
  skill,
  index,
  onEdit,
  onRemove,
}) => {
  const { colors } = useTheme();

  return (
    <Animated.View
      key={index}
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(200)}
      layout={LinearTransition.springify()}
      className="rounded-full border-2 border-[--accent-color] p-2 flex-row items-center justify-between gap-1"
    >
      <AppText className="!text-[--text-primary]" numberOfLines={1}>
        {skill.skillName}
      </AppText>

      <View className="flex-row self-end gap-1 py-1">
        <Pressable
          onPress={async () => {
            await impactAsync(ImpactFeedbackStyle.Light);
            onEdit(index, skill.skillName);
          }}
        >
          <AppIcon name="pen-round" size={22} color={colors["--text-primary"]} />
        </Pressable>

        <Pressable
          onPress={async () => {
            await impactAsync(ImpactFeedbackStyle.Medium);
            onRemove(index);
          }}
        >
          <AppIcon name="trash-bin" size={22} color={colors["--error-color"]} />
        </Pressable>
      </View>
    </Animated.View>
  );
};

export default SkillItem;