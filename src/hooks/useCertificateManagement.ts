import { useSeekerProfile, useUpdateSeekerProfile } from "@queries/userQueries";
import { CertificationsForm } from "@type/profileFormTypes";
import { Certification } from "@type/userTypes";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import {
    UseCertificateManagementProps,
    UseCertificateManagementReturn,
} from "../types/certificateTypes";
import { useProfileStore } from "@store/profileStore";

const useCertificateManagement = ({
  setValue,
  reset,
}: UseCertificateManagementProps): UseCertificateManagementReturn => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingCert, setEditingCert] = useState<Certification | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const { mutateAsync, isPending } = useUpdateSeekerProfile();
  const profile = useProfileStore(state => state.profile);

  const certificates = profile.certifications || [];

  const resetFormState = useCallback(() => {
    setIsAddingNew(false);
    setEditingCert(null);
    setHasUnsavedChanges(false);
  }, []);

  const showDiscardAlert = useCallback((onDiscard: () => void) => {
    Alert.alert(
      "Discard changes?",
      "You have unsaved changes. Are you sure you want to discard them?",
      [
        { text: "Keep Editing", style: "cancel" },
        {
          text: "Discard",
          style: "destructive",
          onPress: onDiscard,
        },
      ]
    );
  }, []);

  const handleAddNew = useCallback(() => {
    reset();
    setEditingCert(null);
    setIsAddingNew(true);
    setHasUnsavedChanges(false);
  }, [reset]);

  const handleEdit = useCallback(
    (cert: Certification) => {
      reset();
      setValue("certificationName", cert.certificationName);
      setEditingCert(cert);
      setIsAddingNew(true);
      setHasUnsavedChanges(false);
    },
    [reset, setValue]
  );

  const handleDelete = useCallback(
    async (cert: Certification) => {
      Alert.alert(
        "Delete Certificate",
        `Are you sure you want to delete "${cert.certificationName}"?`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
              try {
                const updatedCerts = certificates.filter(
                  (c: Certification) =>
                    c.certificationName !== cert.certificationName
                );
                await mutateAsync({ certifications: updatedCerts });
              } catch (error) {
                Alert.alert(
                  "Error",
                  "Failed to delete certificate. Please try again."
                );
              }
            },
          },
        ]
      );
    },
    [certificates, mutateAsync]
  );

  const updateUserCerts = useCallback(
    async (data: CertificationsForm) => {
      try {
        let updatedCerts = [...certificates];

        if (editingCert) {
          updatedCerts = updatedCerts.map((cert) =>
            cert.certificationName === editingCert.certificationName
              ? data
              : cert
          );
        } else {
          updatedCerts.push(data);
        }

        await mutateAsync({
          certifications: updatedCerts,
        });

        resetFormState();
      } catch (error) {
        Alert.alert("Error", "Failed to save certificate. Please try again.");
      }
    },
    [certificates, editingCert, mutateAsync, resetFormState]
  );

  const handleCancel = useCallback(() => {
    if (hasUnsavedChanges) {
      showDiscardAlert(resetFormState);
    } else {
      resetFormState();
    }
  }, [hasUnsavedChanges, showDiscardAlert, resetFormState]);

  return {
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
    showDiscardAlert
  };
};

export default useCertificateManagement;
