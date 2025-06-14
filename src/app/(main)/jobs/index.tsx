import JobCard from "@components/jobs/JobCard";
import { AppText, NavigationHeader } from "@components/ui";
import { useSearchJobs } from "@queries/homeQueries";
import type { JobCategory } from "@type/jobTypes";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

const JobListing = () => {
  const { category } = useLocalSearchParams<{ category?: JobCategory }>();
  const { data, fetchNextPage, hasNextPage, isFetching, isPending, isError } =
    useSearchJobs({ category });
  const jobs = data?.pages.flatMap((page) => page.data) || [];
  const totalCount = data?.pages[0]?.totalCount || 0;


  const getTitle = () => {
    switch (category) {
      case "suggested":
        return "Suggested Jobs";
      case "recent":
        return "Recent Jobs";
      case "trending":
        return "Trending Jobs";
      case "bigCompanies":
        return "Big Companies Jobs";
      case "remote":
        return "Remote Jobs";
      case "fullTime":
        return "Full-time Jobs";
      default:
        return "All Jobs";
    }
  };

  if (isPending) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
        <AppText className="mt-2">Loading jobs...</AppText>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center">
        <AppText>Error loading jobs.</AppText>
      </View>
    );
  }


  return (
    <View className="flex-1 pt-14">
      <NavigationHeader title={getTitle()} />
      <AppText className="pt-2 px-4">
        {totalCount} Result{totalCount !== 1 && "s"} Found
      </AppText>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <JobCard item={item} wrapperStyle={{ width: "100%" }} />
        )}
        contentContainerClassName="py-4 gap-4 px-4"
        onEndReached={() => hasNextPage && !isFetching && fetchNextPage()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => {
          if (hasNextPage) {
            return <ActivityIndicator size="small" className="mt-2" />;
          }
          if (!hasNextPage) {
            return (
              <View className="my-2">
                <AppText className="text-center !text-[--text-muted]">
                  No more jobs
                </AppText>
              </View>
            );
          }
          return null;
        }}
      />
    </View>
  );
};

export default JobListing;
