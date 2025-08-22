import {
  ExperienceItem,
  ProfileSectionLayout,
} from "@components/complete-profile";
import ExperienceDetails from "@components/complete-profile/ExperienceDetails";
import {
  AppButton,
  AppIcon,
  AppText,
  ControlledLabelInput,
} from "@components/ui";
import { useTheme } from "@contexts/ThemeContext";
import useProfileSectionForm from "@hooks/useProfileSectionForm";
import { useUpdateSeekerProfile } from "@queries/userQueries";
import { useProfileStore } from "@store/profileStore";
import { JobItem } from "@type/jobTypes";
import { ExperienceForm } from "@type/profileFormTypes";
import React, { useState } from "react";
import { View } from "react-native";

const Experience = () => {
  const [editingExp, setEditingExp] = useState<any | null>(null);
  const [isEditingExperience, setIsEditingExperience] = useState(false);
  const [isEditingJobs, setIsEditingJobs] = useState(false);
  const profileData = useProfileStore((state) => state.profile);

  const { control, handleSubmit, clearErrors, setValue, reset } =
    useProfileSectionForm("experience", {
      yearsOfExperience: "",
      currentOrDesiredJob: "",
      companyWorkedAt: "",
      workedAs: "",
    });

  const { mutateAsync } = useUpdateSeekerProfile();
  const { colors } = useTheme();

  const experienceData = profileData
    ? {
        yearsOfExperience: profileData.yearsOfExperience,
        currentOrDesiredJob: profileData.currentOrDesiredJob,
        companyWorkedAt: profileData.companyWorkedAt || [],
        workedAs: profileData.workedAs || [],
      }
    : null;

  // Handlers for editing years of experience and current or desired job
  const handleEditExperience = () => {
    setValue(
      "yearsOfExperience",
      experienceData?.yearsOfExperience?.toString() || ""
    );
    setValue("currentOrDesiredJob", experienceData?.currentOrDesiredJob || "");
    setIsEditingExperience(true);
  };

  const submitExperience = async (
    data: Pick<ExperienceForm, "yearsOfExperience" | "currentOrDesiredJob">
  ) => {
    await mutateAsync({
      yearsOfExperience: parseInt(data.yearsOfExperience || "0", 10),
      currentOrDesiredJob: data.currentOrDesiredJob,
    });
    setIsEditingExperience(false);
  };

  const cancelEditExperience = () => {
    setIsEditingExperience(false);
    reset({
      yearsOfExperience: experienceData?.yearsOfExperience?.toString() || "",
      currentOrDesiredJob: experienceData?.currentOrDesiredJob || "",
    });
  };

  // Handlers for editing jobs (companyWorkedAt and workedAs)
  const handleAddNewJob = () => {
    reset({
      companyWorkedAt: "",
      workedAs: "",
    });
    setEditingExp(null);
    setIsEditingJobs(true);
  };

  const handleEditJob = (exp: JobItem) => {
    console.log("editing: ", exp);
    setValue(
      "companyWorkedAt",
      exp.company && exp.company.companyName.length > 0
        ? exp.company.companyName
        : ""
    );
    setValue(
      "workedAs",
      exp.workedAs && exp.workedAs.jobTitle.length > 0
        ? exp.workedAs.jobTitle
        : ""
    );
    setEditingExp(exp);
    setIsEditingJobs(true);
  };

  const submitJobs = async (
    data: Pick<ExperienceForm, "companyWorkedAt" | "workedAs">
  ) => {
    if (editingExp) {
      await mutateAsync({
        companyWorkedAt: profileData.companyWorkedAt?.map((job, index) => {
          if (index === editingExp.id) {
            return { companyName: data.companyWorkedAt || "" };
          }
          return job;
        }),
        workedAs: profileData.workedAs?.map((job, index) => {
          if (index === editingExp.id) {
            return { jobTitle: data.workedAs || "" };
          }
          return job;
        }),
      });
    } else {
      await mutateAsync({
        companyWorkedAt: [
          ...(profileData?.companyWorkedAt ?? []),
          { companyName: data.companyWorkedAt || "" },
        ],
        workedAs: [
          ...(profileData?.workedAs ?? []),
          { jobTitle: data.workedAs || "" },
        ],
      });
    }

    setIsEditingJobs(false);
    setEditingExp(null);
  };

  const cancelEditJobs = () => {
    setIsEditingJobs(false);
    setEditingExp(null);
  };

  const handleDelete = async (item: JobItem) => {
    await mutateAsync({
      companyWorkedAt: profileData.companyWorkedAt?.filter(
        (job) =>
          job.companyName !== item.company?.companyName && job.companyName !== ""
      ),
      workedAs: profileData.workedAs?.filter(
        (job) =>
          job.jobTitle !== item.workedAs?.jobTitle && job.jobTitle !== ""
      ),
    });
  };

  return (
    <ProfileSectionLayout
      title="Experience"
      contentContainerClassName="gap-4 px-4 py-4"
    >
      <ExperienceDetails
        control={control}
        clearErrors={clearErrors}
        handleEdit={handleEditExperience}
        handleSave={handleSubmit(submitExperience)}
        handleCancel={cancelEditExperience}
        isEditing={isEditingExperience}
      />

      {/* Section for job titles and companies worked at */}
      <AppText variant="medium" className="text-lg mb-2">
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
            <View className="items-center justify-center py-8">
              <AppText className="text-[--text-muted] text-center mb-4">
                You haven't added any job titles or companies yet.
              </AppText>
            </View>
          )}

          <AppButton
            title={
              experienceData &&
              ((experienceData.companyWorkedAt &&
                experienceData.companyWorkedAt.length > 0) ||
                (experienceData.workedAs && experienceData.workedAs.length > 0))
                ? "Edit Jobs"
                : "Add Jobs"
            }
            onPress={handleAddNewJob}
            wrapperClassName="mt-4"
            className="py-3"
          />
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
              title={editingExp ? "Update" : "Save"}
              onPress={handleSubmit(submitJobs)}
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
    </ProfileSectionLayout>
  );
};

export default Experience;
