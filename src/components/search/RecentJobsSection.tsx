import JobCard from "@components/jobs/JobCard";
import { AppText } from "@components/ui";
import { useRecentJobsStore } from "@store/recentJobsStore";
import { JobDetails } from "@type/jobTypes";
import { View } from "react-native";

const RecentJobsSection = () => {
  const { recentJobs } = useRecentJobsStore();

  if (recentJobs.length === 0) return null;

  return (
    <View>
      <AppText variant="semiBold" className="mb-4">Recent Jobs</AppText>
      <View className="gap-3">
        {recentJobs.map((job) => (
          <JobCard key={job.id} item={job as JobDetails} />
        ))}
      </View>
    </View>
  );
};

export default RecentJobsSection;