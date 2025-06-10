import JobSection from '@components/jobs/JobSection';
import { AppText } from '@components/ui';
import { useJobs } from '@queries/jobQueries';
import useAuthStore from '@store/authStore';
import { useRecentJobsStore } from '@store/recentJobsStore';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';

const ExploreContent = () => {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { data, isPending } = useJobs(4, isAuthenticated);
  const recentJobs = useRecentJobsStore((state) => state.recentJobs);

  const handleSeeAll = () => {
    router.push("/jobs");
  };

  if ((!data || data?.pages.length === 0) && !isPending)
    return (
      <View className="flex-1 items-center justify-center">
        <AppText>No jobs found</AppText>
      </View>
    );

  return (
    <ScrollView
    className="flex-1"
    contentContainerStyle={{ flexGrow: 1 }}
    showsVerticalScrollIndicator={false}
  >
    <JobSection
      title="Suggested Jobs"
      subtitle="Based on your preferences"
      data={data?.pages[0]?.data}
      onSeeAll={handleSeeAll}
    />

    <JobSection
      title="Recent Jobs"
      subtitle="Find your next opportunity"
      data={recentJobs}
      onSeeAll={handleSeeAll}
    />

    <JobSection
      title="Trending Jobs"
      subtitle="Find market direction"
      data={data?.pages[0]?.data}
      onSeeAll={handleSeeAll}
    />

    <JobSection
      title="Big Companies Jobs"
      subtitle="Level Up your next opportunity"
      data={data?.pages[0]?.data}
      onSeeAll={handleSeeAll}
    />
  </ScrollView>
  )
}

export default ExploreContent