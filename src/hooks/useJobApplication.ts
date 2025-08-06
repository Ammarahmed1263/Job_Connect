import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useApplyForJobById } from "@queries/jobQueries";
import { useFetchResumes, useUploadResume } from "@queries/resumeQueries";
import { useQueryClient } from "@tanstack/react-query";
import { JobApplicationParams } from "@type/jobTypes";
import { Resume } from "@type/userTypes";
import { compareResumesNames, handlePickDocument } from "@utils";
import * as DocumentPicker from "expo-document-picker";
import { useRouter } from "expo-router";
import { ForwardedRef, useCallback, useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { Alert } from "react-native";

interface ApplicationFormData {
  coverLetter: string;
  resumeId: number | null;
  newResume: DocumentPicker.DocumentPickerAsset | null;
}

interface UseJobApplicationReturn {
  isUploading: boolean;
  isApplying: boolean;
  handleUploadNewResume: () => Promise<void>;
  handleSelectResume: (resume: Resume) => void;
  onSubmit: (data: ApplicationFormData) => Promise<void>;
  formMethods: UseFormReturn<ApplicationFormData, any, ApplicationFormData>;
}

export const useJobApplication = (
  jobId: number,
  ref: ForwardedRef<BottomSheetModal>
): UseJobApplicationReturn => {
  const [isUploading, setIsUploading] = useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync: applyForJobById, isPending: isApplying } =
    useApplyForJobById();
  const { mutateAsync: uploadResume } = useUploadResume();
  const router = useRouter();
  const formMethods = useForm<ApplicationFormData>({
    defaultValues: {
      coverLetter: "",
      resumeId: null,
      newResume: null,
    },
    mode: "onChange",
  });

  const uploadResumeAndGetId = useCallback(
    async (
      resume: DocumentPicker.DocumentPickerAsset
    ): Promise<number | null> => {
      try {
        setIsUploading(true);
        await uploadResume(resume);
        console.log("Resume uploaded successfully");

        const updatedResumes: Resume[] = await queryClient.fetchQuery({
          queryKey: ["resumes"],
        });

        const newResumeId = compareResumesNames(resume.name, updatedResumes);

        if (newResumeId) return newResumeId;

        Alert.alert(
          "Error",
          "Could not find the uploaded resume. Please try again."
        );
        return null;
      } catch (uploadError) {
        console.error("Error uploading resume:", uploadError);
        Alert.alert("Error", "Failed to upload resume. Please try again.");
        return null;
      } finally {
        setIsUploading(false);
      }
    },
    [uploadResume, queryClient]
  );

  const submitApplication = useCallback(
    async (data: ApplicationFormData, jobId: number): Promise<boolean> => {
      if (!data.resumeId && !data.newResume) {
        Alert.alert("Error", "Please select or upload a resume");
        return false;
      }

      try {
        let resumeId = data.resumeId;

        if (data.newResume && !resumeId) {
          resumeId = await uploadResumeAndGetId(data.newResume);
          if (!resumeId) return false;
        }

        const applicationData: JobApplicationParams = {
          jobId,
          resumeId: resumeId || 0,
          CoverLetter: data.coverLetter,
        };

        await applyForJobById(applicationData);
        Alert.alert(
          "Success",
          "Your application has been submitted successfully"
        );

        return true;
      } catch (error) {
        console.error("Error applying for job:", error);
        Alert.alert("Error", "Failed to submit application. Please try again.");
        return false;
      }
    },
    [uploadResumeAndGetId, applyForJobById]
  );

  useEffect(() => {
    formMethods.reset();
  }, [formMethods.reset, jobId]);

  const handleSelectResume = useCallback(
    (resume: Resume) => {
      formMethods.setValue("resumeId", resume.id, { shouldValidate: true });
      formMethods.setValue("newResume", null, { shouldValidate: true });
    },
    [formMethods.setValue]
  );

  const handleUploadNewResume = useCallback(async () => {
    await handlePickDocument(async (asset) => {
      formMethods.setValue("newResume", asset, { shouldValidate: true });
      formMethods.setValue("resumeId", null, { shouldValidate: true });
    });
  }, [formMethods.setValue]);

  const onSubmit = useCallback(
    async (data: ApplicationFormData) => {
      const success = await submitApplication(data, jobId);

      if (success) {
        if (ref && typeof ref !== "function") {
          ref.current?.dismiss();
        }
        router.push("/applied");
      }
    },
    [submitApplication, jobId, ref, router]
  );
  return {
    isUploading,
    isApplying,
    handleUploadNewResume,
    handleSelectResume,
    onSubmit,
    formMethods,
  };
};
