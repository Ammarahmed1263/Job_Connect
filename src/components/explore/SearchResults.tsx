import JobCard from "@components/jobs/JobCard";
import JobCardSkeleton from "@components/jobs/JobCardSkeleton";
import { AppLoading, AppText } from "@components/ui";
import { vs } from "@constants/metrics";
import { TAB_HEIGHT } from "@constants/tabBar";
import { useSearchJobs } from "@queries/homeQueries";
import { useFilterStore } from "@store/filterStore";
import { useSearchStore } from "@store/searchStore";
import { Filters } from "@type/filterTypes";
import { getCleanedFilters } from "@utils";
import React, { useMemo } from "react";
import { FlatList, View } from "react-native";

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
  } = useSearchJobs(cleanedQueryFilters);

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

  if (jobs.length === 0 && !isLoading) {
    return (
      <View className="flex-1 items-center justify-center mx-4">
        <AppText className="text-center">
          No jobs found matching your criteria.
        </AppText>
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
        ListFooterComponent={() =>
          hasNextPage ? (
            <AppLoading size={30} />
          ) : (
            <View className="mb-2">
              <AppText className="text-center !text-[--text-muted]">
                No more jobs
              </AppText>
            </View>
          )
        }
        ListEmptyComponent={
          !isLoading ? (
            <View className="flex-1 items-center justify-center">
              <AppText>No jobs found</AppText>
            </View>
          ) : (
            <View className="gap-4">
              <JobCardSkeleton />
              <JobCardSkeleton />
              <JobCardSkeleton />
              <JobCardSkeleton />
              <JobCardSkeleton />
            </View>
          )
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default SearchResults;
