import { Control, UseFormClearErrors, UseFormReset, UseFormSetValue } from "react-hook-form";
import { CertificationsForm } from "@type/profileFormTypes";
import { Certification } from "@type/userTypes";
import React, { Dispatch, SetStateAction } from "react";

export interface UseCertificateManagementProps {
  setValue: UseFormSetValue<CertificationsForm>;
  reset: UseFormReset<CertificationsForm>;
}

export interface UseCertificateManagementReturn {
  isAddingNew: boolean;
  editingCert: Certification | null;
  hasUnsavedChanges: boolean;
  setHasUnsavedChanges: Dispatch<SetStateAction<boolean>>;
  certificates: Certification[];
  isPending: boolean;
  handleAddNew: () => void;
  handleEdit: (cert: Certification) => void;
  handleDelete: (cert: Certification) => Promise<void>;
  updateUserCerts: (data: CertificationsForm) => Promise<void>;
  handleCancel: () => void;
  resetFormState: () => void;
  showDiscardAlert: (onDiscard: () => void) => void;
}