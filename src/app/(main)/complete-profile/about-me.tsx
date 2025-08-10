import { ProfileSectionLayout } from "@components/complete-profile";
import { AppIcon, ControlledLabelInput } from "@components/ui";
import { vs } from "@constants/metrics";
import { useTheme } from "@contexts/ThemeContext";
import useProfileSectionForm from "@hooks/useProfileSectionForm";
import { useUpdateSeekerProfile } from "@queries/userQueries";
import { AboutForm } from "@type/profileFormTypes";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import profileRules from "schemas/profile";

const AboutMe = () => {
  const { control, handleSubmit, formState, clearErrors } =
    useProfileSectionForm("about");
  const { mutateAsync } = useUpdateSeekerProfile();
  const router = useRouter();
  const { colors } = useTheme();

  console.log("form data: ", formState.defaultValues);

  const updateUserAbout = async (data: AboutForm) => {
    console.log("data: ", data);
    await mutateAsync({
      ...data,
    });
    router.back();
  };

  return (
    <ProfileSectionLayout
      title="About Me"
      onSave={handleSubmit(updateUserAbout)}
      contentContainerClassName="gap-4 px-2 pt-4"
    >
      <ControlledLabelInput
        title="Bio"
        control={control}
        clearErrors={clearErrors}
        name="bio"
        rules={profileRules.bio}
        multiline={true}
        numberOfLines={3}
        placeholder="Write a brief description about yourself (max 500 characters)"
        pressableClassName="!items-start"
        style={styles.multilineItem}
        leftComponent={({ focused }) => (
          <AppIcon
            name="user-id"
            size={28}
            color={
              focused ? colors["--accent-color"] : colors["--text-primary"]
            }
            style={styles.leftIcon}
          />
        )}
      />
      <ControlledLabelInput
        title="Cover Letter"
        control={control}
        clearErrors={clearErrors}
        name="coverLetter"
        rules={profileRules.coverLetter}
        multiline={true}
        numberOfLines={6}
        placeholder="Write your cover letter here (max 1000 characters)"
        pressableClassName="!items-start"
        style={[
          styles.multilineItem,
          {
            minHeight: vs(150),
          },
        ]}
        leftComponent={({ focused }) => (
          <AppIcon
            name="clipboard"
            size={24}
            color={
              focused ? colors["--accent-color"] : colors["--text-primary"]
            }
            style={styles.leftIcon}
          />
        )}
      />
      <ControlledLabelInput
        title="Birth Date"
        control={control}
        clearErrors={clearErrors}
        name="dateOfBirth"
        rules={profileRules.dateOfBirth}
        placeholder="DD/MM/YYYY"
        leftComponent={({ focused }) => (
          <AppIcon
            name="calendar"
            size={24}
            color={
              focused ? colors["--accent-color"] : colors["--text-primary"]
            }
          />
        )}
      />
      <ControlledLabelInput
        title="Nationality"
        control={control}
        clearErrors={clearErrors}
        name="nationality"
        placeholder="Enter your nationality"
        leftComponent={({ focused }) => (
          <AppIcon
            name="city"
            size={24}
            color={
              focused ? colors["--accent-color"] : colors["--text-primary"]
            }
          />
        )}
      />
      <ControlledLabelInput
        title="Marital Status"
        control={control}
        clearErrors={clearErrors}
        name="maritalStatus"
        placeholder="Single, Married, etc."
        leftComponent={({ focused }) => (
          <AppIcon
            name="ring"
            size={24}
            color={
              focused ? colors["--accent-color"] : colors["--text-primary"]
            }
          />
        )}
      />
      <ControlledLabelInput
        title="Gender"
        control={control}
        clearErrors={clearErrors}
        name="gender"
        placeholder="Enter your gender"
        leftComponent={({ focused }) => (
          <AppIcon
            name="family"
            size={34}
            color={
              focused ? colors["--accent-color"] : colors["--text-primary"]
            }
          />
        )}
      />
    </ProfileSectionLayout>
  );
};

export default AboutMe;

const styles = StyleSheet.create({
  multilineItem: {
    minHeight: vs(100),
    paddingTop: vs(10),
    textAlignVertical: "top",
  },
  leftIcon: {
    marginTop: vs(8),
  },
});
