import { AppButton, AppIcon, ControlledLabelInput } from "@components/ui";
import { CertificationsForm } from "@type/profileFormTypes";
import React from "react";
import { Control, UseFormClearErrors } from "react-hook-form";
import profileRules from "schemas/profile";

type CertificateFormProps = {
  control: Control<CertificationsForm>;
  clearErrors: UseFormClearErrors<CertificationsForm>;
  colors: Record<string, string>;
  handleCancel: () => void;
};

const CertificateForm = ({
  control,
  clearErrors,
  colors,
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
  </>
);

export default CertificateForm;