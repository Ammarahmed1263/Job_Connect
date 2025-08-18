import {
  CertificateForm,
  CertificateList,
  ProfileSectionLayout,
} from "@components/complete-profile";
import { useTheme } from "@contexts/ThemeContext";
import useCertificateManagement from "@hooks/useCertificateManagement";
import useProfileSectionForm from "@hooks/useProfileSectionForm";
import { useFocusEffect, useNavigation } from "expo-router";
import React, { useCallback, useEffect } from "react";

const Certificates = () => {
  const {
    control,
    handleSubmit,
    clearErrors,
    setValue,
    reset,
    formState: { isDirty },
  } = useProfileSectionForm("certifications", {
    certificationName: "",
  });

  const router = useNavigation();
  const { colors } = useTheme();

  const {
    isAddingNew,
    editingCert,
    hasUnsavedChanges,
    setHasUnsavedChanges,
    certificates,
    isPending,
    handleAddNew,
    handleEdit,
    handleDelete,
    updateUserCerts,
    handleCancel,
    resetFormState,
    showDiscardAlert,
  } = useCertificateManagement({
    setValue,
    reset,
  });

  useEffect(() => {
    setHasUnsavedChanges(isDirty);
  }, [isDirty]);

  return (
    <ProfileSectionLayout
      title="Certificates"
      onSave={isAddingNew ? handleSubmit(updateUserCerts) : undefined}
      saveButtonTitle={editingCert ? "Update" : "Save"}
      showSaveButton={isAddingNew}
      contentContainerClassName="gap-4 px-4 py-4 flex-1"
      onBackPress={isAddingNew ? handleCancel : undefined}
    >
      {!isAddingNew ? (
        <CertificateList
          certificates={certificates}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleAddNew={handleAddNew}
        />
      ) : (
        <CertificateForm
          control={control}
          clearErrors={clearErrors}
          colors={colors}
          isPending={isPending}
          handleCancel={handleCancel}
        />
      )}
    </ProfileSectionLayout>
  );
};

export default Certificates;
