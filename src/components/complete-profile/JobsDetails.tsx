import React from "react";
import { View } from "react-native";
import {
  AppButton,
  AppIcon,
  AppText,
  ControlledLabelInput,
  SubmitButton,
} from "@components/ui";
import ExperienceItem from "./ExperienceItem";
import { JobItem } from "@type/jobTypes";
import { useTheme } from "@contexts/ThemeContext";

type JobsDetailsProps = {
  isEditingJobs: boolean;
  experienceData: {
    companyWorkedAt: { companyName: string }[];
    workedAs: { jobTitle: string }[];
  } | null;
  editingExp: JobItem | null;
  handleAddNewJob: () => void;
  handleEditJob: (exp: JobItem) => void;
  submitJobs: (e?: React.BaseSyntheticEvent) => Promise<void>;
  cancelEditJobs: () => void;
  handleDelete: (item: JobItem) => Promise<void>;
  control: any;
  clearErrors: () => void;
  isPending: boolean;
};

const JobsDetails = ({
  isEditingJobs,
  experienceData,
  editingExp,
  handleAddNewJob,
  handleEditJob,
  submitJobs,
  cancelEditJobs,
  handleDelete,
  control,
  clearErrors,
  isPending,
}: JobsDetailsProps) => {
  const { colors } = useTheme();

  return (
    <>
      <AppText variant="medium" className="text-lg mb-2 mt-4">
        Jobs Details
      </AppText>
      {!isEditingJobs ? (
        <>
          {experienceData &&
          ((experienceData.companyWorkedAt &&
            experienceData.companyWorkedAt.length > 0) ||
            (experienceData.workedAs && experienceData.workedAs.length > 0)) ? (
            experienceData.companyWorkedAt.map((job, index) => {
              return (
                <ExperienceItem
                  key={`${job.companyName}-${index}`}
                  item={{
                    company: job,
                    workedAs: experienceData.workedAs[index],
                    id: index,
                  }}
                  onEdit={handleEditJob}
                  onDelete={handleDelete}
                />
              );
            })
          ) : (
            <View className="items-center justify-center gap-4">
              <AppText
                variant="medium"
                className="text-base text-center mb-4 text-[--text-muted]"
              >
                No jobs added yet.
              </AppText>
              <AppButton
                title="Add Jobs"
                onPress={handleAddNewJob}
                className="py-3 px-6"
              />
            </View>
          )}

          {experienceData &&
            ((experienceData.companyWorkedAt &&
              experienceData.companyWorkedAt.length > 0) ||
              (experienceData.workedAs &&
                experienceData.workedAs.length > 0)) && (
              <AppButton
                title="Edit Jobs"
                onPress={handleAddNewJob}
                wrapperClassName="mt-4"
                className="py-3"
              />
            )}
        </>
      ) : (
        <>
          <ControlledLabelInput
            title="Company"
            control={control}
            clearErrors={clearErrors}
            name="companyWorkedAt"
            placeholder="e.g. Google"
            leftComponent={({ focused }) => (
              <AppIcon
                name="city"
                size={24}
                color={
                  focused ? colors["--accent-color"] : colors["--text-primary"]
                }
              />
            )}
          />
          <ControlledLabelInput
            title="Title"
            control={control}
            clearErrors={clearErrors}
            name="workedAs"
            placeholder="e.g. Senior Developer"
            leftComponent={({ focused }) => (
              <AppIcon
                name="case-outline"
                size={24}
                color={
                  focused ? colors["--accent-color"] : colors["--text-primary"]
                }
              />
            )}
          />

          <View className="flex-row gap-4 mt-2">
            <AppButton
              title="Cancel"
              onPress={cancelEditJobs}
              flat
              className="py-2 px-4"
            />
            <SubmitButton
              title={editingExp ? "Update" : "Save"}
              onPress={submitJobs}
              className="py-2 px-4"
              disabled={isPending}
              disableShadow={isPending}
              isLoading={isPending}
            />
          </View>
        </>
      )}
    </>
  );
};

export default JobsDetails;
