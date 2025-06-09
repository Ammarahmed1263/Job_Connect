import DetailsBlock from "@components/jobs/DetailsBlock";
import AboutTab from "@components/jobs/detailsTabs/AboutTab";
import CompanyTab from "@components/jobs/detailsTabs/CompanyTab";
import ReviewTab from "@components/jobs/detailsTabs/ReviewTab";
import { AppButton, AppIcon, AppText, NavigationHeader } from "@components/ui";
import { useTheme } from "@contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useSafeArea } from "@hooks/useSafeArea";
import { useWithAuth } from "@hooks/useWithAuth";
import { useJobById, useSaveJob, useUnsaveJob } from "@queries/jobQueries";
import { useSavedJobs } from "@queries/userQueries";
import { useRecentJobsStore } from "@store/recentJobsStore";
import { JobDetails as JobDetailsType } from "@type/jobTypes";
import { formatSalary, getSeniorityLevel } from "@utils";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

const JobDetails = () => {
  const { id } = useLocalSearchParams();
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<"about" | "company" | "review">(
    "about"
  );
  const { data: job, isPending, error } = useJobById(Number(id));
  const { data: savedJobs } = useSavedJobs();
  const { mutate: unsaveJob } = useUnsaveJob();
  const { mutate: saveJob } = useSaveJob();
  const addRecentJob = useRecentJobsStore((state) => state.addRecentJob);
  const { requireAuth } = useWithAuth();
  console.log("saved jobs: ", savedJobs?.data);
  const isSaved =
    job &&
    savedJobs?.data?.some((savedJob: JobDetailsType) => savedJob.id === job.id);

  console.log("job details: ", job);

  useEffect(() => {
    if (job) {
      console.log("added to recent successfully");
      addRecentJob({
        id: job.id,
        title: job.title,
        status: job.status,
        jobType: job.jobType,
        workPlace: job.workPlace,
        experience: job.experience,
        applicationsCount: job.applicationsCount,
        postedDate: job.postedDate,
        minSalary: job.minSalary,
        maxSalary: job.maxSalary,
        salaryType: job.salaryType,
        employer: job.employer,
      });
    }
  }, [job]);

  const handleToggleSave = async () => {
    if (requireAuth()) return;

    try {
      isSaved ? unsaveJob(job.id) : saveJob(job!);
    } catch (error) {
      console.log("Error toggling job save:", error);
    }
  };

  if (isPending) {
    return (
      <View className="flex-1 items-center justify-center">
        <AppText>Loading...</AppText>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center">
        <AppText>Oops..error occured please try again</AppText>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[--bg-color]">
      <NavigationHeader>
        <View className="flex-row gap-4">
          <TouchableOpacity onPress={handleToggleSave}>
            <AppIcon
              name={isSaved ? "bookmark" : "bookmark-outline"}
              color={colors["--text-primary"]}
              size={28}
            />
          </TouchableOpacity>
          <AppIcon name="share" color={colors["--text-primary"]} size={28} />
        </View>
      </NavigationHeader>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Company Info */}
        <View className="items-center py-4">
          <View className="w-20 aspect-square rounded-full bg-[--accent-color] items-center justify-center mb-4">
            <AppText
              variant="bold"
              className="text-white text-3xl leading-tight"
            >
              {job?.employer?.companyName[0].toUpperCase()}.
            </AppText>
          </View>
          <AppText variant="medium" className="text-xl mb-1">
            {job?.title}
          </AppText>
          <AppText className="color-[--text-muted] mb-1">
            {job?.employer?.companyName}
          </AppText>
          <View className="flex-row items-center gap-1">
            <AppIcon
              name="map-point"
              size={28}
              color={colors["--accent-color"]}
            />
            <AppText className="color-[--text-muted]">{job?.location}</AppText>
          </View>
        </View>

        {/* Job Details Grid */}
        <View className="flex-row flex-wrap justify-between px-4 py-2">
          <DetailsBlock
            title={`Salary (${job?.salaryType})`}
            icon="wallet-outline"
            value={`$${formatSalary(job?.minSalary)}k - $${formatSalary(
              job?.maxSalary
            )}k`}
          />

          <DetailsBlock
            title="Job Type"
            icon="briefcase-outline"
            value={job?.jobType}
          />
          <DetailsBlock
            title="Working Model"
            icon="desktop-outline"
            value={job?.workPlace}
          />
          <DetailsBlock
            title="Level"
            icon="stats-chart"
            value={getSeniorityLevel(job?.experience) ?? "N/A"}
          />
        </View>

        {/* Tabs */}
        <View className="flex-row border-b border-[--border-color] justify-center">
          {["about", "company", "review"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab as typeof activeTab)}
              className={`pb-2 items-center flex-1 ${
                activeTab === tab ? "border-b-2 border-[--accent-color]" : ""
              }`}
            >
              <AppText
                variant="medium"
                className={
                  activeTab === tab
                    ? "color-[--accent-color]"
                    : "color-[--text-muted]"
                }
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        {activeTab === "about" && <AboutTab job={job} />}
        {activeTab === "company" && <CompanyTab employer={job?.employer} />}
        {activeTab === "review" && <ReviewTab />}
      </ScrollView>

      {/* Apply Button */}
      <View className="pb-8 pt-4 p-4 bg-[--card-color] rounded-t-xl border-t-hairline border-t-[--text-muted]">
        <AppButton
          title="Apply for Job"
          variant="primary"
          className="bg-[--accent-color]"
        />
      </View>
    </View>
  );
};

export default JobDetails;
function addRecentJob(job: JobDetailsType) {
  throw new Error("Function not implemented.");
}
