import JobCard from "@components/jobs/JobCard";
import { AppText } from "@components/ui";
import { JobDetails, jobSummary } from "@type/jobTypes";
import { View } from "react-native";

interface RecentJobsSectionProps {
  recentJobs: jobSummary[];
}

const RecentJobsSection = ({ recentJobs }: RecentJobsSectionProps) => {
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