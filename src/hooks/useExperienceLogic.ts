import { useEffect, useState } from "react";
import { useTheme } from "@contexts/ThemeContext";
import useProfileSectionForm from "@hooks/useProfileSectionForm";
import { useUpdateSeekerProfile } from "@queries/userQueries";
import { useProfileStore } from "@store/profileStore";
import { JobItem } from "@type/jobTypes";
import { ExperienceForm } from "@type/profileFormTypes";

const useExperienceLogic = () => {
  const [editingExp, setEditingExp] = useState<JobItem | null>(null);
  const [isEditingExperience, setIsEditingExperience] = useState(false);
  const [isEditingJobs, setIsEditingJobs] = useState(false);
  const profileData = useProfileStore((state) => state.profile);
  const { control, handleSubmit, clearErrors, setValue, reset, formState } =
  useProfileSectionForm("experience");
    console.log("experience state: ", JSON.stringify(formState.defaultValues, null, 2));

  const { mutateAsync, isPending } = useUpdateSeekerProfile();
  const { colors } = useTheme();

  const experienceData = profileData
    ? {
        yearsOfExperience: profileData.yearsOfExperience,
        currentOrDesiredJob: profileData.currentOrDesiredJob,
        companyWorkedAt: profileData.companyWorkedAt || [],
        workedAs: profileData.workedAs || [],
      }
    : null;

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

  const handleAddNewJob = () => {
    reset({
      companyWorkedAt: "",
      workedAs: "",
    });
    setEditingExp(null);
    setIsEditingJobs(true);
  };

  const handleEditJob = (exp: JobItem) => {
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

  return {
    control,
    clearErrors,
    isEditingExperience,
    isEditingJobs,
    experienceData,
    editingExp,
    isPending,
    handleEditExperience,
    submitExperience: handleSubmit(submitExperience),
    cancelEditExperience,
    handleAddNewJob,
    handleEditJob,
    submitJobs: handleSubmit(submitJobs),
    cancelEditJobs,
    handleDelete,
    colors,
  };
};

export default useExperienceLogic;