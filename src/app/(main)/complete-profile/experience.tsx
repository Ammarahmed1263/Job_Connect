import { ExperienceDetails, ProfileSectionLayout } from "@components/complete-profile";
import JobsDetails from "@components/complete-profile/JobsDetails";
import useExperienceLogic from "@hooks/useExperienceLogic";
import React from "react";

const Experience = () => {
  const {
    control,
    clearErrors,
    isEditingExperience,
    isEditingJobs,
    experienceData,
    editingExp,
    isPending,
    handleEditExperience,
    submitExperience,
    cancelEditExperience,
    handleAddNewJob,
    handleEditJob,
    submitJobs,
    cancelEditJobs,
    handleDelete,
  } = useExperienceLogic();

  return (
    <ProfileSectionLayout
      title="Experience"
      contentContainerClassName="gap-4 px-4 py-4"
      isLoading={isPending}
    >
      <ExperienceDetails
        control={control}
        clearErrors={clearErrors}
        handleEdit={handleEditExperience}
        handleSave={submitExperience}
        handleCancel={cancelEditExperience}
        isEditing={isEditingExperience}
        isPending={isPending}
      />

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
        isPending={isPending}
      />
    </ProfileSectionLayout>
  );
};

export default Experience;
