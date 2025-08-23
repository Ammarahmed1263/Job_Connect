import JobSection from "@components/jobs/JobSection";
import { AppText } from "@components/ui";
import { TAB_HEIGHT } from "@constants/tabBar";
import { useSearchJobs } from "@queries/homeQueries";
import { useRecentJobsStore } from "@store/recentJobsStore";
import type { JobCategory } from "@type/jobTypes";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import useRecommendedJobs from "./useRecommendedJobs";

const ExploreContent = () => {
  const router = useRouter();
  const {
    data: allJobs,
    isPending: isAllPending,
    isError: isAllError,
  } = useSearchJobs();
  const {
    data: remoteJobs,
    isPending: isRemotePending,
    isError: isRemoteError,
  } = useSearchJobs({ category: "remote" });
  const {
    data: fullTimeJobs,
    isPending: isFullTimePending,
    isError: isFullTimeError,
  } = useSearchJobs({ category: "fullTime" });
  const recentJobs = useRecentJobsStore((state) => state.recentJobs);
  const { data: recommendedJobs, isLoading: isRecommendedLoading } =
    useRecommendedJobs();

  const handleSeeAll = (category: JobCategory) => {
    router.push({
      pathname: "/jobs",
      params: { category },
    });
  };

  if (isAllError && isRemoteError && isFullTimeError) {
    return (
      <View className="flex-1 items-center justify-center">
        <AppText>Error loading jobs.</AppText>
      </View>
    );
  }

  return (
  <ScrollView
      className="flex-1"
      contentContainerStyle={{ flexGrow: 1, paddingBottom: TAB_HEIGHT }}
      showsVerticalScrollIndicator={false}
    >
        <JobSection
          title="Recent Jobs"
          subtitle="Find your next opportunity"
          data={recentJobs}
          onSeeAll={() => handleSeeAll("recent")}
        />

        <JobSection
          title="Recommended Jobs"
          subtitle="Based on your preferences"
          data={recommendedJobs || []}
          useRecommendCard
          isLoading={isRecommendedLoading}
        />

        <JobSection
          title="Remote Jobs"
          subtitle="Work from anywhere"
          data={remoteJobs?.pages[0]?.data || []}
          onSeeAll={() => handleSeeAll("remote")}
          isLoading={isRemotePending}
        />

        <JobSection
          title="Trending Jobs"
          subtitle="Find market direction"
          data={allJobs?.pages[0]?.data || []}
          onSeeAll={() => handleSeeAll("trending")}
          isLoading={isAllPending}
        />

        <JobSection
          title="Full-time Jobs"
          subtitle="Stable opportunities"
          data={fullTimeJobs?.pages[0]?.data || []}
          onSeeAll={() => handleSeeAll("fullTime")}
          isLoading={isFullTimePending}
        />
    </ScrollView>
  );
};

export default ExploreContent;
