import {
  AppButton,
  AppIcon,
  ControlledLabelInput,
  NavigationHeader,
} from "@components/ui";
import { SkillsList } from "@components/complete-profile";
import { vs } from "@constants/metrics";
import { useTheme } from "@contexts/ThemeContext";
import useProfileSectionForm from "@hooks/useProfileSectionForm";
import { useSafeArea } from "@hooks/useSafeArea";
import { useUpdateSeekerProfile } from "@queries/userQueries";
import { SkillsForm } from "@type/profileFormTypes";
import { useRouter } from "expo-router";
import React from "react";
import { Controller } from "react-hook-form";
import { Keyboard, ScrollView, StyleSheet, View } from "react-native";

const Skills = () => {
  const { control, handleSubmit, getValues, setValue, clearErrors } = useProfileSectionForm(
    "skills",
    {
      skillInput: "",
    }
  );
  const { mutateAsync } = useUpdateSeekerProfile();
  const { colors } = useTheme();
  const router = useRouter();
  const { bottom } = useSafeArea();

  const updateUserSkills = async (data: SkillsForm) => {
    await mutateAsync({
      skills: data.skills,
    });
    Keyboard.dismiss();
    router.back();
  };

  return (
    <View className="flex-1">
      <NavigationHeader title="Skills" />

      <View className="p-4 gap-4 flex-row items-end">
        <ControlledLabelInput
          title="Skills"
          control={control}
          clearErrors={clearErrors}
          name="skillInput"
          containerClassName="flex-1"
          leftComponent={() => (
            <AppIcon name="chart" size={24} color={colors["--text-primary"]} />
          )}
        />

        <AppButton
          title="Add"
          onPress={() => {
            const currentInput = getValues("skillInput").trim();
            const currentSkills = getValues("skills") || [];
            
            const skillExists = currentSkills.some(
              skill => skill.skillName === currentInput
            );

            if (currentInput && !skillExists) {
              const newSkill = { skillName: currentInput };
              const updated = [...currentSkills, newSkill];
              setValue("skills", updated);
              setValue("skillInput", "");
            }
          }}
        />
      </View>

      <ScrollView
        className="px-4 mt-2 mb-24"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Controller
          control={control}
          name="skills"
          render={({ field: { value = [], onChange } }) => (
            <SkillsList
              skills={value}
              onEdit={(index, skill) => {
                const currentSkills = [...value];
                currentSkills.splice(index, 1);
                onChange(currentSkills);
                setValue("skillInput", skill);
              }}
              onRemove={(index) => {
                const filtered = value.filter((_, i) => i !== index);
                onChange(filtered);
              }}
            />
          )}
        />
      </ScrollView>

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
