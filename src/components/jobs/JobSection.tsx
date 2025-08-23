import { AppButton, AppText } from "@components/ui";
import { width } from "@constants/metrics";
import { useQueries } from "@tanstack/react-query";
import jobService from "@api/services/jobService"; // <- import directly
import useAuthStore from "@store/authStore";
import { jobSummary } from "@type/jobTypes";
import React from "react";
import { FlatList, View } from "react-native";
import JobCard from "./JobCard";

interface JobSectionProps {
  title: string;
  subtitle: string;
  data: jobSummary[];
  onSeeAll?: () => void;
  useRecommendCard?: boolean;
  isLoading?: boolean;
}

import JobSectionSkeleton from "@components/explore/JobSectionSkeleton";

const JobSection = ({
  title,
  subtitle,
  data,
  onSeeAll,
  isLoading,
  useRecommendCard = false,
}: JobSectionProps) => {
  const jobDetails = useRecommendCard
    ? useQueries({
        queries: data.slice(0, 6).map((job) => ({
          queryKey: ["getJobById", job.id],
          queryFn: () => jobService.fetchJobById(job.id),
        })),
      })
    : [];

  const isLoadingDetails =
    (useRecommendCard && jobDetails.some((q) => q.isLoading)) || isLoading;

  if (isLoadingDetails) return <JobSectionSkeleton />;

  if (data.length == 0 && !isLoadingDetails) return null;

  return (
    <View className="py-4">
      <View className="px-4 mb-4 flex-row justify-between items-center">
        <View>
          <AppText variant="medium" className="text-xl">
            {title}
          </AppText>
          <AppText variant="light" className="color-[--text-muted]">
            {subtitle}
          </AppText>
        </View>
        {onSeeAll && (
          <AppButton
            variant="primary"
            title="See all"
            textClassName="color-[--accent-color]"
            onPress={onSeeAll}
            flat
          />
        )}
      </View>

      <FlatList
        data={data.slice(0, 6)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => {
          const jobItem = useRecommendCard
            ? (jobDetails[index]?.data as jobSummary)
            : item;

          if (!jobItem) return null;

          return (
            <JobCard
              item={jobItem}
              wrapperStyle={{ width: width - width * 0.15 }}
            />
          );
        }}
        contentContainerClassName="pb-4 gap-4 px-4 items-center"
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </View>
  );
};

export default JobSection;
