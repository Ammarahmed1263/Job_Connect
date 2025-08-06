import {
  AppButton,
  AppIcon,
  AppText,
  ControlledLabelInput,
} from "@components/ui";
import { hs, vs } from "@constants/metrics";
import { useTheme } from "@contexts/ThemeContext";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useSafeArea } from "@hooks/useSafeArea";
import { useApplyForJobById } from "@queries/jobQueries";
import { useFetchResumes, useUploadResume } from "@queries/resumeQueries";
import { useQueryClient } from "@tanstack/react-query";
import { JobApplicationParams } from "@type/jobTypes";
import { Resume } from "@type/userTypes";
import { handlePickDocument } from "@utils";
import * as DocumentPicker from "expo-document-picker";
import { useRouter } from "expo-router";
import React, { forwardRef, useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Alert, TouchableOpacity, View } from "react-native";
import profileRules from "schemas/profile";

interface ApplicationModalProps {
  jobId: number;
  jobTitle: string;
}

interface ApplicationFormData {
  coverLetter: string;
  resumeId: number | null;
  newResume: DocumentPicker.DocumentPickerAsset | null;
}

const ApplicationModal = forwardRef<BottomSheetModal, ApplicationModalProps>(
  ({ jobId, jobTitle }, ref) => {
    const { bottom } = useSafeArea();
    const { colors } = useTheme();
    const router = useRouter();
    const queryClient = useQueryClient();
    const { data: resumes, isLoading: isResumesLoading } = useFetchResumes();
    const { mutateAsync: applyForJobById, isPending: isApplying } =
      useApplyForJobById();
    const { mutateAsync: uploadResume, isPending: isUploading } =
      useUploadResume();

    const {
      control,
      handleSubmit,
      formState: { isValid },
      clearErrors,
      reset,
      setValue,
      watch,
    } = useForm<ApplicationFormData>({
      defaultValues: {
        coverLetter: "",
        resumeId: null,
        newResume: null,
      },
      mode: "onChange",
    });

    const selectedResumeId = watch("resumeId");
    const selectedNewResume = watch("newResume");

    const snapPoints = useMemo(() => ["85%", "90%"], []);

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          pressBehavior="close"
          opacity={0.5}
        />
      ),
      []
    );

    useEffect(() => {
      reset();
    }, [reset, jobId]);

    const handleSelectResume = (resume: Resume) => {
      setValue("resumeId", resume.id, { shouldValidate: true });
      setValue("newResume", null, { shouldValidate: true });
    };

    const handleUploadNewResume = async () => {
      await handlePickDocument(async (asset) => {
        setValue("newResume", asset, { shouldValidate: true });
        setValue("resumeId", null, { shouldValidate: true });
      });
    };

    const onSubmit = async (data: ApplicationFormData) => {
      if (!data.resumeId && !data.newResume) {
        Alert.alert("Error", "Please select or upload a resume");
        return;
      }

      try {
        let resumeId = data.resumeId;

        if (data.newResume && !resumeId) {
          try {
            await uploadResume(data.newResume);
            console.log("Resume uploaded successfully");
            
            
            const updatedResumes = queryClient.getQueryData(["resumes"]);
            console.log('updated resumes: ', updatedResumes, data.newResume?.name)
            
            if (updatedResumes && Array.isArray(updatedResumes)) {
              const newlyUploadedResume = updatedResumes.find(
                (resume) => resume.resumeName === data.newResume?.name
              );
              
              if (newlyUploadedResume) {
                resumeId = newlyUploadedResume.id;
                setValue("resumeId", resumeId, { shouldValidate: true });
                setValue("newResume", null, { shouldValidate: true });
              } else {
                Alert.alert(
                  "Error",
                  "Could not find the uploaded resume. Please try again."
                );
                return;
              }
            } else {
              Alert.alert(
                "Error",
                "Failed to retrieve resumes. Please try again."
              );
              return;
            }
          } catch (uploadError) {
            setValue("newResume", null);
            console.error("Error uploading resume:", uploadError);
            Alert.alert("Error", "Failed to upload resume. Please try again.");
            return;
          }
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

        if (ref && typeof ref !== "function") {
          ref.current?.dismiss();
        }
        router.push("/applied");
      } catch (error) {
        console.error("Error applying for job:", error);
        Alert.alert("Error", "Failed to submit application. Please try again.");
      }
    };

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enableDismissOnClose
        handleIndicatorStyle={{ backgroundColor: colors["--accent-color"] }}
        backgroundStyle={{ backgroundColor: colors["--card-color"] }}
        keyboardBlurBehavior="restore"
      >
        <View className="flex-1">
          <View className="flex-row justify-between items-center px-4 mb-4 self-center">
            <AppText variant="bold" className="text-xl text-[--text-primary]">
              Apply for Job
            </AppText>
          </View>

          <BottomSheetScrollView
            contentContainerStyle={{
              paddingBottom: bottom + 100,
              paddingHorizontal: hs(16),
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View className="mb-6">
              <AppText variant="medium" className="mb-2">
                Job Title
              </AppText>
              <AppText className="text-[--text-muted]">{jobTitle}</AppText>
            </View>

            <View className="mb-6">
              <AppText variant="medium" className="mb-2">
                Resume
              </AppText>

              {isResumesLoading ? (
                <AppText>Loading resumes...</AppText>
              ) : (
                <View className="gap-2">
                  {resumes &&
                    resumes.length > 0 &&
                    resumes.map((resume) => (
                      <TouchableOpacity
                        key={resume.id}
                        className={`flex-row items-center px-4 py-3 border rounded-lg ${
                          selectedResumeId === resume.id
                            ? "border-[--accent-color] bg-[--accent-color]/10"
                            : "border-[--border-color]"
                        }`}
                        onPress={() => handleSelectResume(resume)}
                      >
                        <AppIcon
                          name="document-text"
                          size={24}
                          color={colors["--accent-color"]}
                        />
                        <AppText className="ml-2 flex-1">
                          {resume.resumeName}
                        </AppText>
                        {selectedResumeId === resume.id && (
                          <AppIcon
                            name="checkmark"
                            size={24}
                            color={colors["--accent-color"]}
                          />
                        )}
                      </TouchableOpacity>
                    ))}

                  <TouchableOpacity
                    className={`flex-row items-center px-4 py-3 border rounded-lg mt-2 ${
                      selectedNewResume
                        ? "border-[--accent-color] bg-[--accent-color]/10"
                        : "border-[--border-color] border-dashed"
                    }`}
                    onPress={handleUploadNewResume}
                  >
                    <AppIcon
                      name="file-send"
                      size={24}
                      color={colors["--accent-color"]}
                    />
                    <AppText className="ml-2 flex-1">
                      {selectedNewResume
                        ? selectedNewResume.name
                        : "Upload new resume"}
                    </AppText>
                    {selectedNewResume && (
                      <AppIcon
                        name="checkmark"
                        size={24}
                        color={colors["--accent-color"]}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View className="mb-6">
              <ControlledLabelInput
                title="Cover Letter"
                control={control}
                clearErrors={clearErrors}
                name="coverLetter"
                rules={profileRules.coverLetter}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                containerClassName="mb-4"
                style={{
                  height: 120,
                  textAlignVertical: "top",
                  paddingTop: vs(4),
                }}
                placeholder="Introduce yourself and explain why you're a good fit for this position"
              />
            </View>
          </BottomSheetScrollView>

          <View
            className="absolute bottom-0 left-0 right-0 px-4 py-4 bg-[--card-color] border-t border-[--border-color]"
            style={{ paddingBottom: bottom + 16 }}
          >
            <AppButton
              title={
                isUploading
                  ? "Uploading Resume..."
                  : isApplying
                  ? "Submitting..."
                  : "Submit Application"
              }
              onPress={handleSubmit(onSubmit)}
              disabled={
                isUploading ||
                isApplying ||
                !isValid ||
                (!selectedResumeId && !selectedNewResume)
              }
              wrapperClassName="w-full !rounded-full"
              className="py-3"
            />
          </View>
        </View>
      </BottomSheetModal>
    );
  }
);

export default ApplicationModal;
