import {
  AppButton,
  AppIcon,
  ControlledLabelInput,
  NavigationHeader,
} from "@components/ui";
import { vs } from "@constants/metrics";
import { useTheme } from "@contexts/ThemeContext";
import { useSafeArea } from "@hooks/useSafeArea";
import { useUpdateSeekerProfile } from "@queries/userQueries";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SkillsForm } from "@type/profileFormTypes";
import useProfileSectionForm from "@hooks/useProfileSectionForm";

const Skills = () => {
  const { control, handleSubmit } = useProfileSectionForm("skills");
  const { mutateAsync } = useUpdateSeekerProfile();
  const { colors } = useTheme();
  const router = useRouter();
  const { bottom } = useSafeArea();

  const updateUserSkills = async (data: SkillsForm) => {
    console.log("data: ", data);
    // await mutateAsync({
    //   ...data,
    // });
    router.back();
  };

  return (
    <View className="flex-1">
      <NavigationHeader title="Skills" />
      <ControlledLabelInput
        title="Skills"
        control={control}
        name="skillName"
        leftComponent={() => (
          <AppIcon name="chart" size={24} color={colors["--text-primary"]} />
        )}
      />

      <View
        className="absolute px-4 bg-[--card-color] shadow-lg"
        style={{
          ...styles.saveButton,
          paddingBottom: bottom + vs(20),
        }}
      >
        <AppButton
          title="Save"
          onPress={handleSubmit(updateUserSkills)}
          className="py-2"
          wrapperClassName="!rounded-full mx-2"
        />
      </View>
    </View>
  );
};

export default Skills;

const styles = StyleSheet.create({
  saveButton: {
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: vs(14),
    borderRadius: vs(14),
  },
  placeholder: {
    height: vs(80),
  },
});