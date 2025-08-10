import { ProfileSectionLayout } from "@components/complete-profile";
import { AppIcon, ControlledLabelInput } from "@components/ui";
import { useTheme } from "@contexts/ThemeContext";
import useProfileSectionForm from "@hooks/useProfileSectionForm";
import { useUpdateSeekerProfile } from "@queries/userQueries";
import { EducationForm } from "@type/profileFormTypes";
import { useRouter } from "expo-router";
import React from "react";
import profileRules from "schemas/profile";

const Education = () => {
  const { control, handleSubmit, clearErrors } =
    useProfileSectionForm("education");
  const { mutateAsync } = useUpdateSeekerProfile();
  const { colors } = useTheme();
  const router = useRouter();

  const updateUserEducation = async (data: EducationForm) => {
    console.log("data: ", data);
    await mutateAsync({
      ...data,
    });
    router.back();
  };

  return (
    <ProfileSectionLayout
      title="Education"
      onSave={handleSubmit(updateUserEducation)}
      contentContainerClassName="gap-4 px-4 py-4"
    >
      <ControlledLabelInput
        title="Education"
        control={control}
        clearErrors={clearErrors}
        name="education"
        rules={profileRules.education}
        placeholder="Highest level of education"
        leftComponent={({ focused }) => (
          <AppIcon
            name="academic-cap"
            size={24}
            color={
              focused ? colors["--accent-color"] : colors["--text-primary"]
            }
          />
        )}
      />
      <ControlledLabelInput
        title="Degree"
        control={control}
        clearErrors={clearErrors}
        name="degree"
        rules={profileRules.degree}
        placeholder="e.g. Bachelor of Science"
        leftComponent={({ focused }) => (
          <AppIcon
            name="diploma"
            size={24}
            color={
              focused ? colors["--accent-color"] : colors["--text-primary"]
            }
          />
        )}
      />
      <ControlledLabelInput
        title="University"
        control={control}
        clearErrors={clearErrors}
        name="university"
        rules={profileRules.university}
        placeholder="e.g. Harvard University"
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
        title="College Name"
        control={control}
        clearErrors={clearErrors}
        name="collegeName"
        rules={profileRules.collegeName}
        placeholder="e.g. College of Engineering"
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
    </ProfileSectionLayout>
  );
};

export default Education;

