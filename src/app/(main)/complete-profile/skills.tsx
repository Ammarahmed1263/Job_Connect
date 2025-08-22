import { ProfileSectionLayout, SkillsList } from "@components/complete-profile";
import {
  AppButton,
  AppIcon,
  ControlledLabelInput
} from "@components/ui";
import { useTheme } from "@contexts/ThemeContext";
import useProfileSectionForm from "@hooks/useProfileSectionForm";
import { useUpdateSeekerProfile } from "@queries/userQueries";
import { SkillsForm } from "@type/profileFormTypes";
import { useRouter } from "expo-router";
import React from "react";
import { Controller } from "react-hook-form";
import { Keyboard, View } from "react-native";
import profileRules from "schemas/profile";

const Skills = () => {
  const { control, handleSubmit, getValues, setValue, clearErrors } =
    useProfileSectionForm("skills", {
      skillInput: "",
    });
  const { mutateAsync, isPending } = useUpdateSeekerProfile();
  const { colors } = useTheme();
  const router = useRouter();

  const updateUserSkills = async (data: SkillsForm) => {
    await mutateAsync({
      skills: data.skills,
    });
    Keyboard.dismiss();
    router.back();
  };

  return (
    <ProfileSectionLayout
      onSave={handleSubmit(updateUserSkills)}
      title="Skills"
      isLoading={isPending}
    >
      <View className="gap-4 flex-row items-end mb-4">
        <ControlledLabelInput
          title="Skills"
          control={control}
          clearErrors={clearErrors}
          name="skillInput"
          rules={profileRules.skillInput}
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
              (skill) => skill.skillName === currentInput
            );

            if (currentInput && !skillExists) {
              const newSkill = { skillName: currentInput };
              const updated = [...currentSkills, newSkill];
              setValue("skills", updated);
              setValue("skillInput", "");
            }
          }}
          className="border-2 border-[--accent-color] px-4 py-2 rounded-xl"
          flat
        />
      </View>

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
    </ProfileSectionLayout>
  );
};

export default Skills;