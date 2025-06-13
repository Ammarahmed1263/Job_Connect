import {
  AppButton,
  AppIcon,
  ControlledLabelInput,
  NavigationHeader,
} from "@components/ui";
import { vs } from "@constants/metrics";
import { useProfileForm } from "@contexts/formContext";
import { useTheme } from "@contexts/ThemeContext";
import { useSafeArea } from "@hooks/useSafeArea";
import { useUpdateSeekerProfile } from "@queries/userQueries";
import { ProfileFormData } from "@type/userTypes";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const Education = () => {
  const { control, handleSubmit } = useProfileForm();
  const { mutateAsync } = useUpdateSeekerProfile();
  const { colors } = useTheme();
  const { bottom } = useSafeArea();
  const router = useRouter();

  const updateUserEducation = async (data: ProfileFormData) => {
    console.log("data: ", data.contactInfo);
    await mutateAsync({
      ...data.contactInfo,
    });
    router.back();
  };

  return (
    <View className="flex-1">
      <NavigationHeader title="Education" />
      <ScrollView
        contentContainerClassName="gap-4 px-4 py-4"
        className="flex-1"
        keyboardShouldPersistTaps="handled"
      >
        <ControlledLabelInput
          title="Education"
          control={control}
          name="education.education"
          leftComponent={() => (
            <AppIcon
              name="instagram"
              size={24}
              color={colors["--text-primary"]}
            />
          )}
        />
        <ControlledLabelInput
          title="Degree"
          control={control}
          name="education.degree"
          leftComponent={() => (
            <AppIcon
              name="instagram"
              size={24}
              color={colors["--text-primary"]}
            />
          )}
        />
        <ControlledLabelInput
          title="University"
          control={control}
          name="education.university"
          leftComponent={() => (
            <AppIcon
              name="instagram"
              size={24}
              color={colors["--text-primary"]}
            />
          )}
        />
        <ControlledLabelInput
          title="College Name"
          control={control}
          name="education.collegeName"
          leftComponent={() => (
            <AppIcon
              name="instagram"
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
          onPress={handleSubmit(updateUserEducation)}
          className="py-2"
          wrapperClassName="!rounded-full mx-2"
        />
      </View>
    </View>
  );
};

export default Education;

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
