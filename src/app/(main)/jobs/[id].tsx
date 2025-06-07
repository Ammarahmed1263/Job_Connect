import AboutTab from "@components/jobs/detailsTabs/AboutTab";
import CompanyTab from "@components/jobs/detailsTabs/CompanyTab";
import ReviewTab from "@components/jobs/detailsTabs/ReviewTab";
import { AppButton, AppIcon, AppText } from "@components/ui";
import { useTheme } from "@contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useSafeArea } from "@hooks/useSafeArea";
import { useWithAuth } from "@hooks/useWithAuth";
import { useJobById, useSaveJob, useUnsaveJob } from "@queries/jobQueries";
import { useSavedJobs } from "@queries/userQueries";
import { JobDetails as JobDetailsType } from "@type/jobTypes";
import { formatSalary } from "@utils";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

const JobDetails = () => {
  const { id } = useLocalSearchParams();
  const { colors } = useTheme();
  const { top } = useSafeArea();
  const [activeTab, setActiveTab] = useState<"about" | "company" | "review">(
    "about"
  );
  const { data: job, isPending, error } = useJobById(Number(id));
  const { data: savedJobs } = useSavedJobs();
  const { mutate: unsaveJob } = useUnsaveJob();
  const { mutate: saveJob } = useSaveJob();
  const { requireAuth } = useWithAuth();
  console.log('saved jobs: ', savedJobs?.data)
  const isSaved = job && savedJobs?.data?.some(
    (savedJob: JobDetailsType) => savedJob.id === job.id
  );
  
  console.log("data here: ", job);

  const handleToggleSave = async () => {
    if (requireAuth()) return;

    try {
      isSaved ? unsaveJob(job.id) : saveJob(job);
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
    <View className="flex-1 bg-[--bg-color]" style={{ paddingTop: top }}>
      {/* Header */}
      <View className="flex-row justify-between items-center p-4">
        <TouchableOpacity onPress={() => router.back()}>
          {/* <Ionicons name="arrow-back" size={24} color={colors["--text-primary"]} /> */}
          <AppIcon
            name="arrow-left"
            color={colors["--text-primary"]}
            size={30}
          />
        </TouchableOpacity>
        <View className="flex-row gap-4">
          <TouchableOpacity onPress={handleToggleSave}>
            <AppIcon
              name={isSaved ? "bookmark" : "bookmark-outline"}
              color={colors["--text-primary"]}
              size={26}
            />
          </TouchableOpacity>
          <AppIcon name="share" color={colors["--text-primary"]} size={28} />
        </View>
      </View>

      <ScrollView className="flex-1">
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
          <View className="w-[48%] bg-[--card-color] p-4 rounded-xl mb-4">
            <View className="flex-row items-center gap-2 mb-2">
              <Ionicons
                name="wallet-outline"
                size={20}
                color={colors["--accent-color"]}
              />
              <AppText className="color-[--text-muted]">
                Salary ({job?.salaryType})
              </AppText>
            </View>
            <AppText className="text-center">
              ${formatSalary(job?.minSalary)}k - ${formatSalary(job?.maxSalary)}
              k
            </AppText>
          </View>

          <View className="w-[48%] bg-[--card-color] p-4 rounded-xl mb-4">
            <View className="flex-row items-center gap-2 mb-2">
              <Ionicons
                name="briefcase-outline"
                size={20}
                color={colors["--accent-color"]}
              />
              <AppText className="color-[--text-muted]">Job Type</AppText>
            </View>
            <AppText className="text-center">Full - Time</AppText>
          </View>

          <View className="w-[48%] bg-[--card-color] p-4 rounded-xl mb-4">
            <View className="flex-row items-center gap-2 mb-2">
              <Ionicons
                name="desktop-outline"
                size={20}
                color={colors["--accent-color"]}
              />
              <AppText className="color-[--text-muted]">Working Model</AppText>
            </View>
            <AppText className="text-center">Remote</AppText>
          </View>

          <View className="w-[48%] bg-[--card-color] p-4 rounded-xl mb-4">
            <View className="flex-row items-center gap-2 mb-2">
              <Ionicons
                name="stats-chart"
                size={20}
                color={colors["--accent-color"]}
              />
              <AppText className="color-[--text-muted]">Level</AppText>
            </View>
            <AppText className="text-center">Internship</AppText>
          </View>
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
