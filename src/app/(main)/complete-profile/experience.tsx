import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import {
  AppButton,
  ControlledLabelInput,
  NavigationHeader,
} from "@components/ui";
import { useProfileForm } from "@contexts/formContext";
import { ProfileFormData } from "@type/userTypes";
import { useUpdateSeekerProfile } from "@queries/userQueries";
import { useRouter } from "expo-router";
import { useSafeArea } from "@hooks/useSafeArea";
import { vs } from "@constants/metrics";

const Experience = () => {
  const { control, handleSubmit } = useProfileForm();
  const { mutateAsync } = useUpdateSeekerProfile();
  const router = useRouter();
  const { bottom } = useSafeArea();

  const updateUserExperience = async (data: ProfileFormData) => {
    console.log("data: ", data.contactInfo);
    await mutateAsync({
      ...data.contactInfo,
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
          name="experience.yearsOfExperience"
        />
        <ControlledLabelInput
          title="Current or Desired"
          control={control}
          name="experience.currentOrDesiredJob"
        />
        <ControlledLabelInput
          title="Company"
          control={control}
          name="experience.companyWorkedAt"
        />
        <ControlledLabelInput
          title="Title"
          control={control}
          name="experience.workedAs"
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
