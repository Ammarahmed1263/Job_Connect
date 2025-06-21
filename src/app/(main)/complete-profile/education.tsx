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
import { EducationForm } from "@type/profileFormTypes";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const Education = () => {
  const { control, handleSubmit } = useProfileSectionForm("education");
  const { mutateAsync } = useUpdateSeekerProfile();
  const { colors } = useTheme();
  const { bottom } = useSafeArea();
  const router = useRouter();

  const updateUserEducation = async (data: EducationForm) => {
    console.log("data: ", data);
    // await mutateAsync({
    //   ...data,
    // });
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
          name="education"
          leftComponent={() => (
            <AppIcon
              name="academic-cap"
              size={24}
              color={colors["--text-primary"]}
            />
          )}
        />
        <ControlledLabelInput
          title="Degree"
          control={control}
          name="degree"
          leftComponent={() => (
            <AppIcon
              name="diploma"
              size={24}
              color={colors["--text-primary"]}
            />
          )}
        />
        <ControlledLabelInput
          title="University"
          control={control}
          name="university"
          leftComponent={() => (
            <AppIcon
              name="city"
              size={24}
              color={colors["--text-primary"]}
            />
          )}
        />
        <ControlledLabelInput
          title="College Name"
          control={control}
          name="collegeName"
          leftComponent={() => (
            <AppIcon
              name="city"
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
