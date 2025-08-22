import { ExperienceDetails, ProfileSectionLayout } from "@components/complete-profile";
import JobsDetails from "@components/complete-profile/JobsDetails";
import { AppText } from "@components/ui";
import React from "react";
import useExperienceLogic from "./useExperienceLogic";

const Experience = () => {
  const {
    control,
    clearErrors,
    isEditingExperience,
    isEditingJobs,
    experienceData,
    editingExp,
    handleEditExperience,
    submitExperience,
    cancelEditExperience,
    handleAddNewJob,
    handleEditJob,
    submitJobs,
    cancelEditJobs,
    handleDelete,
    colors,
  } = useExperienceLogic();

  return (
    <ProfileSectionLayout
      title="Experience"
      contentContainerClassName="gap-4 px-4 py-4"
    >
      <ExperienceDetails
        control={control}
        clearErrors={clearErrors}
        handleEdit={handleEditExperience}
        handleSave={submitExperience}
        handleCancel={cancelEditExperience}
        isEditing={isEditingExperience}
      />

      <AppText variant="medium" className="text-lg mb-2">
        Jobs Details
      </AppText>

      <JobsDetails
        isEditingJobs={isEditingJobs}
        experienceData={experienceData}
        editingExp={editingExp}
        handleAddNewJob={handleAddNewJob}
        handleEditJob={handleEditJob}
        submitJobs={submitJobs}
        cancelEditJobs={cancelEditJobs}
        handleDelete={handleDelete}
        control={control}
        clearErrors={clearErrors}
        colors={colors}
      />
    </ProfileSectionLayout>
  );
};

export default Experience;
