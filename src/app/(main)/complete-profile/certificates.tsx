import {
  CertificateForm,
  CertificateList,
  ProfileSectionLayout,
} from "@components/complete-profile";
import { useTheme } from "@contexts/ThemeContext";
import useCertificateManagement from "@hooks/useCertificateManagement";
import useProfileSectionForm from "@hooks/useProfileSectionForm";
import { useNavigation } from "expo-router";
import React, { useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";

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

  const navigation = useNavigation();
  const { colors } = useTheme();

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener("beforeRemove", (e) => {
        if (isAddingNew && hasUnsavedChanges) {
        e.preventDefault();
          showDiscardAlert(resetFormState);
        } else if (isAddingNew) {
          e.preventDefault();
          resetFormState();
        }
      });

      return unsubscribe;
    }, [navigation, isAddingNew, hasUnsavedChanges])
  );

  useEffect(() => {
    setHasUnsavedChanges(isDirty);
  }, [isDirty]);

  return (
    <ProfileSectionLayout
      title="Certificates"
      onSave={isAddingNew ? handleSubmit(updateUserCerts) : undefined}
      saveButtonTitle={
        isPending ? "Saving changes..." : editingCert ? "Update" : "Save"
      }
      showSaveButton={isAddingNew}
      contentContainerClassName="gap-4 px-4 py-4 flex-1"
      onBackPress={isAddingNew ? handleCancel : undefined}
      isLoading={isPending}
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
          handleCancel={handleCancel}
        />
      )}
    </ProfileSectionLayout>
  );
};

export default Certificates;
