import {
  AppIcon,
  ControlledLabelInput,
} from "@components/ui";
import { ProfileSectionLayout } from "@components/complete-profile";
import profileRules from "schemas/profile";
import { useTheme } from "@contexts/ThemeContext";
import useProfileSectionForm from "@hooks/useProfileSectionForm";
import { useUpdateSeekerProfile } from "@queries/userQueries";
import { CertificationsForm } from "@type/profileFormTypes";
import { useRouter } from "expo-router";
import React from "react";

const Certificates = () => {
  const { control, handleSubmit, clearErrors } = useProfileSectionForm('certifications');
  const { mutateAsync } = useUpdateSeekerProfile();
  const router = useRouter();
  const { colors } = useTheme();

  const updateUserCerts = async (data: CertificationsForm) => {
    console.log("data: ", data);
    // await mutateAsync({
    //   ...data,
    // });
    router.back();
  };

  return (
    <ProfileSectionLayout
      title="Certificates"
      onSave={handleSubmit(updateUserCerts)}
      contentContainerClassName="gap-4 px-4 py-4"
    >
        <ControlledLabelInput
          title="Certification Name"
          control={control}
          clearErrors={clearErrors}
          name="certificationName"
          rules={profileRules.certificationName}
          placeholder="e.g. AWS Certified Solutions Architect"
          leftComponent={() => (
            <AppIcon
              name="diploma"
              size={24}
              color={colors["--text-primary"]}
            />
          )}
        />
        <ControlledLabelInput
          title="Issue Date"
          control={control}
          clearErrors={clearErrors}
          name="issueDate"
          rules={profileRules.issueDate}
          placeholder="DD/MM/YYYY"
          leftComponent={() => (
            <AppIcon
              name="calendar"
              size={24}
              color={colors["--text-primary"]}
            />
          )}
          />
        <ControlledLabelInput
          title="Issuing Organization"
          control={control}
          clearErrors={clearErrors}
          name="issuingOrganization"
          rules={profileRules.issuingOrganization}
          placeholder="e.g. Amazon Web Services"
          leftComponent={() => (
            <AppIcon
            name="city"
            size={24}
            color={colors["--text-primary"]}
            />
          )}
          />
        <ControlledLabelInput
          title="Expiry Date (Optional)"
          control={control}
          clearErrors={clearErrors}
          name="expiryDate"
          rules={profileRules.expiryDate}
          placeholder="DD/MM/YYYY"
          leftComponent={() => (
            <AppIcon
              name="calendar"
              size={24}
              color={colors["--text-primary"]}
            />
          )}
          />
    </ProfileSectionLayout>
  );
};

export default Certificates;
