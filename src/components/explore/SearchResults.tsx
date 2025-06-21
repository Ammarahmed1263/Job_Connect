import JobCard from "@components/jobs/JobCard";
import { AppText } from "@components/ui";
import { vs } from "@constants/metrics";
import { TAB_HEIGHT } from "@constants/tabBar";
import { useSearchJobs } from "@queries/homeQueries";
import { useFilterStore } from "@store/filterStore";
import { useSearchStore } from "@store/searchStore";
import { Filters } from "@type/filterTypes";
import { getCleanedFilters } from "@utils";
import React, { useMemo } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

interface QueryFilters extends Partial<Filters> {
  title?: string;
}

const SearchResults = () => {
  const { filters } = useFilterStore();
  const { searchText } = useSearchStore();

  const queryFilters: QueryFilters = useMemo(
    () => ({
      ...filters,
      title: searchText,
    }),
    [filters, searchText]
  );

  const cleanedQueryFilters = useMemo(
    () => getCleanedFilters(queryFilters),
    [queryFilters]
  );

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useSearchJobs(cleanedQueryFilters);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
        <AppText className="mt-2">Loading jobs...</AppText>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center mx-8">
        <AppText className="text-center">
          Oops.. an error occurred. Please try again later.
        </AppText>
      </View>
    );
  }

 
  const jobs = data?.pages.flatMap((page) => page.data) || [];
  const totalCount = data?.pages[0]?.totalCount || 0;

  if (jobs.length === 0) {
    return (
      <View className="flex-1 items-center justify-center mx-4">
        <AppText className="text-center">No jobs found matching your criteria.</AppText>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <AppText className="pt-2 px-4">
        {totalCount} Result{totalCount !== 1 && "s"} Found
      </AppText>
      <FlatList
        data={jobs}
        keyExtractor={(item, index) => `${item.id.toString()}-${index}`}
        renderItem={({ item }) => <JobCard item={item} />}
        contentContainerClassName="pt-4 gap-4 px-4"
        contentContainerStyle={{ paddingBottom: vs(TAB_HEIGHT) }}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
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
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default SearchResults;
