import { ProfileSectionLayout } from "@components/complete-profile";
import {
  AppIcon,
  ControlledLabelInput
} from "@components/ui";
import { useTheme } from "@contexts/ThemeContext";
import useProfileSectionForm from "@hooks/useProfileSectionForm";
import { useUpdateSeekerProfile } from "@queries/userQueries";
import { ExperienceForm } from "@type/profileFormTypes";
import { useRouter } from "expo-router";
import React from "react";
import profileRules from "schemas/profile";

const Experience = () => {
  const { control, handleSubmit, clearErrors } =
    useProfileSectionForm("experience");
  const { mutateAsync } = useUpdateSeekerProfile();
  const router = useRouter();
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
    <ProfileSectionLayout
      title="Experience"
      onSave={handleSubmit(updateUserExperience)}
      contentContainerClassName="gap-4 px-4 py-4"
    >
      <ControlledLabelInput
        title="Years Of Experience"
        control={control}
        clearErrors={clearErrors}
        name="yearsOfExperience"
        rules={profileRules.yearsOfExperience}
        placeholder="e.g. 5"
        leftComponent={() => (
          <AppIcon name="calendar" size={24} color={colors["--text-primary"]} />
        )}
      />
      <ControlledLabelInput
        title="Current or Desired"
        control={control}
        clearErrors={clearErrors}
        name="currentOrDesiredJob"
        placeholder="e.g. Software Engineer"
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
        placeholder="e.g. Google"
        leftComponent={() => (
          <AppIcon name="city" size={24} color={colors["--text-primary"]} />
        )}
      />
      <ControlledLabelInput
        title="Title"
        control={control}
        clearErrors={clearErrors}
        name="workedAs"
        placeholder="e.g. Senior Developer"
        leftComponent={() => (
          <AppIcon
            name="case-outline"
            size={24}
            color={colors["--text-primary"]}
          />
        )}
      />
    </ProfileSectionLayout>
  );
};

export default Experience;
