import { View, Text } from "react-native";
import React from "react";
import {
  AppIcon,
  ControlledLabelInput,
  NavigationHeader,
} from "@components/ui";
import { useProfileForm } from "@contexts/formContext";
import { ProfileFormData } from "@type/userTypes";
import { useUpdateSeekerProfile } from "@queries/userQueries";
import { useTheme } from "@contexts/ThemeContext";

const Skills = () => {
  const { control } = useProfileForm();
  const { mutate } = useUpdateSeekerProfile();
  const { colors } = useTheme();

  const updateUserSkills = (data: ProfileFormData) => {
    console.log("data: ", data.contactInfo);
    mutate({
      ...data.contactInfo,
    });
  };

  return (
    <View>
      <NavigationHeader title="Skills" />
      <ControlledLabelInput
        title="Skills"
        control={control}
        name="skills"
        leftComponent={() => (
          <AppIcon
            name="chart"
            size={24}
            color={colors["--text-primary"]}
          />
        )}
      />
    </View>
  );
};

export default Skills;
