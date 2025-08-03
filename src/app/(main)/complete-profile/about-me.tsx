import { ProfileSectionLayout } from "@components/complete-profile";
import {
  AppIcon,
  ControlledLabelInput,
} from "@components/ui";
import { vs } from "@constants/metrics";
import { useTheme } from "@contexts/ThemeContext";
import useProfileSectionForm from "@hooks/useProfileSectionForm";
import { useUpdateSeekerProfile } from "@queries/userQueries";
import { AboutForm } from "@type/profileFormTypes";
import { useRouter } from "expo-router";
import React from "react";
import profileRules from "schemas/profile";

const AboutMe = () => {
  const { control, handleSubmit, formState, clearErrors } = useProfileSectionForm("about");
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
          pressableClassName="!items-start"
          style={{
            minHeight: vs(100),
            textAlignVertical: "top",
          }}
          leftComponent={() => (
            <AppIcon
              name="user-id"
              size={28}
              color={colors["--text-primary"]}
              style={{
                marginTop: vs(8),
              }}
            />
          )}
        />
        {/* <ControlledLabelInput
          title="Cover Letter"
          control={control}
          clearErrors={clearErrors}
          name="coverLetter"
          multiline={true}
          numberOfLines={6}
          pressableClassName="!items-start"
          style={{
            minHeight: vs(150),
            textAlignVertical: "top",
          }}
          leftComponent={() => (
            <AppIcon
              name="clipboard"
              size={24}
              color={colors["--text-primary"]}
              style={{
                marginTop: vs(8),
              }}
            />
          )}
        /> */}
        <ControlledLabelInput
          title="Cover Letter"
          control={control}
          clearErrors={clearErrors}
          name="coverLetter"
          rules={profileRules.coverLetter}
          multiline={true}
          numberOfLines={6}
          pressableClassName="!items-start"
          style={{
            minHeight: vs(150),
            textAlignVertical: "top",
          }}
          leftComponent={() => (
            <AppIcon
              name="clipboard"
              size={24}
              color={colors["--text-primary"]}
              style={{
                marginTop: vs(8),
              }}
            />
          )}
        />
        <ControlledLabelInput
          title="Birth Date"
          control={control}
          clearErrors={clearErrors}
          name="dateOfBirth"
          rules={profileRules.dateOfBirth}
          leftComponent={() => (
            <AppIcon
              name="calendar"
              size={24}
              color={colors["--text-primary"]}
            />
          )}
        />
        <ControlledLabelInput
          title="Nationality"
          control={control}
          clearErrors={clearErrors}
          name="nationality"
          leftComponent={() => (
            <AppIcon name="city" size={24} color={colors["--text-primary"]} />
          )}
        />
        <ControlledLabelInput
          title="Marital Status"
          control={control}
          clearErrors={clearErrors}
          name="maritalStatus"
          leftComponent={() => (
            <AppIcon name="ring" size={24} color={colors["--text-primary"]} />
          )}
        />
        <ControlledLabelInput
          title="gender"
          control={control}
          clearErrors={clearErrors}
          name="gender"
          leftComponent={() => (
            <AppIcon name="family" size={34} color={colors["--text-primary"]} />
          )}
        />
    </ProfileSectionLayout>
  );
};

export default AboutMe;
