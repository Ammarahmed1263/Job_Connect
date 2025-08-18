import { AppButton, AppIcon, AppText, ControlledLabelInput } from "@components/ui";
import React from "react";
import { Control, UseFormClearErrors } from "react-hook-form";
import profileRules from "schemas/profile";
import { CertificationsForm } from "@type/profileFormTypes";

type CertificateFormProps = {
  control: Control<CertificationsForm>;
  clearErrors: UseFormClearErrors<CertificationsForm>;
  colors: Record<string, string>;
  isPending: boolean;
  handleCancel: () => void;
};

const CertificateForm = ({
  control,
  clearErrors,
  colors,
  isPending,
  handleCancel,
}: CertificateFormProps) => (
  <>
    <ControlledLabelInput
      title="Certification Name"
      control={control}
      clearErrors={clearErrors}
      name="certificationName"
      rules={profileRules.certificationName}
      placeholder="e.g. AWS Certified Solutions Architect"
      leftComponent={({ focused }) => (
        <AppIcon
          name="diploma"
          size={24}
          color={focused ? colors["--accent-color"] : colors["--text-primary"]}
        />
      )}
    />

    <AppButton
      title="Cancel"
      onPress={handleCancel}
      wrapperClassName="mt-4 !border-2 border-[--accent-color]"
      className="py-3"
      textClassName="!text-[--accent-color]"
      flat
    />

    {isPending && (
      <AppText className="text-center mt-4 text-[--text-muted]">
        Saving changes...
      </AppText>
    )}
  </>
);

export default CertificateForm;