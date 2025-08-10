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
import { useJobApplication } from "@hooks/useJobApplication";
import { useSafeArea } from "@hooks/useSafeArea";
import { useFetchResumes } from "@queries/resumeQueries";
import React, { forwardRef, useCallback, useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import profileRules from "schemas/profile";

interface ApplicationModalProps {
  jobId: number;
  jobTitle: string;
}

const ApplicationModal = forwardRef<BottomSheetModal, ApplicationModalProps>(
  ({ jobId, jobTitle }, ref) => {
    const { bottom } = useSafeArea();
    const { colors } = useTheme();
    const { data: resumes, isLoading: isResumesLoading } = useFetchResumes();
    const {
      isUploading,
      isApplying,
      formMethods,
      handleSelectResume,
      handleUploadNewResume,
      onSubmit,
    } = useJobApplication(jobId, ref);
    const selectedResumeId = formMethods.watch("resumeId");
    const selectedNewResume = formMethods.watch("newResume");

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
                control={formMethods.control}
                clearErrors={formMethods.clearErrors}
                name="coverLetter"
                rules={profileRules.coverLetter}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                containerClassName="mb-4"
                style={styles.coverLetter}
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
              onPress={formMethods.handleSubmit(onSubmit)}
              disabled={
                isUploading ||
                isApplying ||
                !formMethods.formState.isValid ||
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

const styles = StyleSheet.create({
  coverLetter: {
    height: hs(120),
    textAlignVertical: "top",
    paddingTop: vs(8),
    paddingStart: hs(4),
  },
});
