import {
  AppButton,
  AppIcon,
  ControlledLabelInput,
  NavigationHeader,
} from "@components/ui";
import { vs } from "@constants/metrics";
import { useTheme } from "@contexts/ThemeContext";
import useProfileSectionForm from "@hooks/useProfileSectionForm";
import { useSafeArea } from "@hooks/useSafeArea";
import { useUpdateSeekerProfile } from "@queries/userQueries";
import { ExperienceForm } from "@type/profileFormTypes";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const Experience = () => {
  const { control, handleSubmit, clearErrors } = useProfileSectionForm("experience");
  const { mutateAsync } = useUpdateSeekerProfile();
  const router = useRouter();
  const { bottom } = useSafeArea();
  const { colors } = useTheme();

  const updateUserExperience = async (data: ExperienceForm) => {
    console.log("data: ", data);
    await mutateAsync({
      ...data,
      yearsOfExperience: parseInt(data.yearsOfExperience || "0", 10),
    });
    router.back();
  };

  return (
    <View className="flex-1">
      <NavigationHeader title="Experience" />
      <ScrollView
        contentContainerClassName="gap-4 px-4 py-4"
        className="flex-1"
        keyboardShouldPersistTaps="handled"
      >
        <ControlledLabelInput
          title="Years Of Experience"
          control={control}
          clearErrors={clearErrors}
          name="yearsOfExperience"
          leftComponent={() => (
            <AppIcon
              name="calendar"
              size={24}
              color={colors["--text-primary"]}
            />
          )}
          
        />
        <ControlledLabelInput
          title="Current or Desired"
          control={control}
          clearErrors={clearErrors}
          name="currentOrDesiredJob"
          leftComponent={() => (
            <AppIcon
              name="case-outline"
              size={24}
              color={colors["--text-primary"]}
            />
          )}
        />
        <ControlledLabelInput
          title="Company"
          control={control}
          clearErrors={clearErrors}
          name="companyWorkedAt"
          leftComponent={() => (
            <AppIcon
              name="city"
              size={24}
              color={colors["--text-primary"]}
            />
          )}
        />
        <ControlledLabelInput
          title="Title"
          control={control}
          clearErrors={clearErrors}
          name="workedAs"
          leftComponent={() => (
            <AppIcon
              name="case-outline"
              size={24}
              color={colors["--text-primary"]}
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
          onPress={handleSubmit(updateUserExperience)}
          className="py-2"
          wrapperClassName="!rounded-full mx-2"
        />
      </View>
    </View>
  );
};

export default Experience;

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
