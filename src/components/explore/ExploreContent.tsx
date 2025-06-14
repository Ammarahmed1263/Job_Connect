import JobSection from "@components/jobs/JobSection";
import { AppText } from "@components/ui";
import { useSearchJobs } from "@queries/homeQueries";
import { useRecentJobsStore } from "@store/recentJobsStore";
import type { JobCategory } from "@type/jobTypes";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
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
  // const { data: remoteJobs, isPending: isRemotePending, isError:  isRemoteError} = useSearchJobs();
  const recentJobs = useRecentJobsStore((state) => state.recentJobs);
  const { data: recommendedJobs, isLoading: isRecommendedLoading } =
    useRecommendedJobs();

  const handleSeeAll = (category: JobCategory) => {
    router.push({
      pathname: "/jobs",
      params: { category },
    });
  };

  const isPending =
    isAllPending ||
    isRemotePending ||
    isFullTimePending ||
    isRecommendedLoading;

  if (isPending) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
        <AppText className="mt-2">Loading jobs...</AppText>
      </View>
    );
  }

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
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      {recentJobs.length > 0 && (
        <JobSection
          title="Recent Jobs"
          subtitle="Find your next opportunity"
          data={recentJobs}
          onSeeAll={() => handleSeeAll("recent")}
        />
      )}

      {recommendedJobs?.length > 0 && (
        <JobSection
          title="Recommended Jobs"
          subtitle="Based on your preferences"
          data={recommendedJobs}
          useRecommendCard
        />
      )}

      {remoteJobs?.pages[0]?.data && remoteJobs.pages[0].data.length > 0 && (
        <JobSection
          title="Remote Jobs"
          subtitle="Work from anywhere"
          data={remoteJobs?.pages[0]?.data}
          onSeeAll={() => handleSeeAll("remote")}
        />
      )}

      {allJobs?.pages[0]?.data && allJobs.pages[0].data.length > 0 && (
        <JobSection
          title="Trending Jobs"
          subtitle="Find market direction"
          data={allJobs?.pages[0]?.data}
          onSeeAll={() => handleSeeAll("trending")}
        />
      )}

      {fullTimeJobs?.pages[0]?.data &&
        fullTimeJobs.pages[0].data.length > 0 && (
          <JobSection
            title="Full-time Jobs"
            subtitle="Stable opportunities"
            data={fullTimeJobs?.pages[0]?.data}
            onSeeAll={() => handleSeeAll("fullTime")}
          />
        )}
    </ScrollView>
  );
};

export default ExploreContent;
