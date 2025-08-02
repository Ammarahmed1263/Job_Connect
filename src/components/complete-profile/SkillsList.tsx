import React, { FC } from "react";
import { View } from "react-native";
import { AppText } from "@components/ui";
import { useTheme } from "@contexts/ThemeContext";
import { Skill } from "@type/userTypes";
import SkillItem from "./SkillItem";

interface SkillsListProps {
  skills: Skill[];
  onEdit: (index: number, skill: string) => void;
  onRemove: (index: number) => void;
}

const SkillsList: FC<SkillsListProps> = ({ skills, onEdit, onRemove }) => {
  const { colors } = useTheme();

  return (
    <View className="flex-row flex-wrap gap-2">
      {skills.length === 0 && (
        <View className="py-4 w-full items-center px-4">
          <AppText className="text-[--text-muted] text-center" variant="medium">
            Add your skills to enhance your profile
          </AppText>
        </View>
      )}

      {skills.map((skill, index) => (
        <SkillItem
          key={index}
          skill={skill}
          index={index}
          onEdit={onEdit}
          onRemove={onRemove}
        />
      ))}
    </View>
  );
};

export default SkillsList;
