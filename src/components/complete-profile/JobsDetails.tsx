import { AppButton, AppIcon, ControlledLabelInput } from "@components/ui";
import { JobItem } from "@type/jobTypes";
import React from "react";
import { View } from "react-native";
import ExperienceItem from "./ExperienceItem";

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
  colors: Record<string, string>;
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
  colors,
}: JobsDetailsProps) => {
  return (
    <>
      {!isEditingJobs ? (
        <>
          {experienceData &&
          ((experienceData.companyWorkedAt && experienceData.companyWorkedAt.length > 0) ||
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
            <View className="items-center justify-center py-8">
              <AppIcon
                name="case"
                size={48}
                color={colors["--text-muted"]}
                style={{ marginBottom: 12 }}
              />
              <AppButton
                title="Add Jobs"
                onPress={handleAddNewJob}
                className="py-3 px-6"
              />
            </View>
          )}

          {experienceData &&
          ((experienceData.companyWorkedAt && experienceData.companyWorkedAt.length > 0) ||
            (experienceData.workedAs && experienceData.workedAs.length > 0)) && (
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
                color={focused ? colors["--accent-color"] : colors["--text-primary"]}
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
                color={focused ? colors["--accent-color"] : colors["--text-primary"]}
              />
            )}
          />

          <View className="flex-row gap-4 mt-2">
            <AppButton
              title={editingExp ? "Update" : "Save"}
              onPress={submitJobs}
              className="py-2 px-4"
            />
            <AppButton
              title="Cancel"
              onPress={cancelEditJobs}
              flat
              className="py-2 px-4"
            />
          </View>
        </>
      )}
    </>
  );
};

export default JobsDetails;