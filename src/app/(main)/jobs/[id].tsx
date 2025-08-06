import BriefCaseAnimation from "@assets/lottie/brief-case.json";
import ApplicationModal from "@components/jobs/ApplicationModal";
import DetailsBlock from "@components/jobs/DetailsBlock";
import AboutTab from "@components/jobs/detailsTabs/AboutTab";
import CompanyTab from "@components/jobs/detailsTabs/CompanyTab";
import { AppButton, AppIcon, AppText, NavigationHeader } from "@components/ui";
import { useTheme } from "@contexts/ThemeContext";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useWithAuth } from "@hooks/useWithAuth";
import { useJobById, useSaveJob, useUnsaveJob } from "@queries/jobQueries";
import { useAppliedJobs, useSavedJobs } from "@queries/userQueries";
import { useRecentJobsStore } from "@store/recentJobsStore";
import { JobDetails as JobDetailsType } from "@type/jobTypes";
import { formatSalary, getSeniorityLevel } from "@utils";
import { useLocalSearchParams } from "expo-router";
import LottieView from "lottie-react-native";
import { useEffect, useRef, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

const JobDetails = () => {
  const { id } = useLocalSearchParams();
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<"about" | "company" | "review">(
    "about"
  );
  const { data: job, isPending, isError } = useJobById(Number(id));
  const { data: savedJobs } = useSavedJobs();
  const { data: appliedJobs } = useAppliedJobs();
  const { mutate: unsaveJob } = useUnsaveJob();
  const { mutate: saveJob } = useSaveJob();
  const addRecentJob = useRecentJobsStore((state) => state.addRecentJob);
  const { requireAuth } = useWithAuth();
  const applicationModalRef = useRef<BottomSheetModal>(null);

  const isSaved =
    job &&
    savedJobs?.data?.some((savedJob: JobDetailsType) => savedJob.id === job.id);
    
  const hasApplied = 
    job && 
    appliedJobs?.data?.some((appliedJob: JobDetailsType) => appliedJob.id === job.id);

  useEffect(() => {
    if (job) {
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
        location: job.location,
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

  const handleApply = () => {
    if (requireAuth()) return;
    applicationModalRef.current?.present();
  };

  if (isPending) {
    return (
      <View className="flex-1 items-center justify-center bg-[--bg-color]">
        <LottieView
          source={BriefCaseAnimation}
          autoPlay
          loop
          duration={1.5 * 1000}
          style={{ width: 250, height: 250 }}
          colorFilters={[
            {
              keypath: "Case - 23",
              color: colors["--bg-color"],
            },
            {
              keypath: "Case - 18",
              color: colors["--bg-color"],
            },
            {
              keypath: "Case - 17",
              color: colors["--bg-color"],
            },
          ]}
        />
      </View>
    );
  }

  if (isError) {
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
              size={26}
            />
          </TouchableOpacity>
          <AppIcon name="share" color={colors["--text-primary"]} size={28} />
        </View>
      </NavigationHeader>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
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

        <View className="flex-row flex-wrap justify-between px-4 pt-2 gap-4 mb-4">
          <DetailsBlock
            title={`Salary (${job?.salaryType})`}
            icon="wallet-outline"
            value={
              `$${formatSalary(job?.minSalary)}k - $${formatSalary(
                job?.maxSalary
              )}k`.length > 0
                ? `$${formatSalary(job?.minSalary)}k - $${formatSalary(
                    job?.maxSalary
                  )}k`
                : "N/A"
            }
          />

          <DetailsBlock
            title="Job Type"
            icon="briefcase-outline"
            value={job?.jobType.length > 0 ? job?.jobType : "N/A"}
          />
        </View>

        <View className="flex-row flex-wrap justify-between px-4 pb-2 gap-4">
          <DetailsBlock
            title="Working Model"
            icon="desktop-outline"
            value={job?.workPlace.length > 0 ? job?.workPlace : "N/A"}
          />
          <DetailsBlock
            title="Level"
            icon="stats-chart"
            value={getSeniorityLevel(job?.experience) ?? "N/A"}
          />
        </View>

        <View className="flex-row justify-center">
          {["about", "company"].map((tab) => (
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

        {activeTab === "about" && <AboutTab job={job} />}
        {activeTab === "company" && <CompanyTab employer={job?.employer} />}
      </ScrollView>

      <View className="pb-8 pt-4 p-4 bg-[--card-color] rounded-t-xl">
        <AppButton
          title={hasApplied ? "Applied" : "Apply for Job"}
          variant="primary"
          className={`${hasApplied ? "bg-[--text-muted]" : "bg-[--accent-color]"}`}
          onPress={handleApply}
          disabled={hasApplied}
          disableShadow={hasApplied}
        />
      </View>
      
      <ApplicationModal 
        ref={applicationModalRef} 
        jobId={Number(id)} 
        jobTitle={job?.title || ""}
      />
    </View>
  );
};

export default JobDetails;

