import JobCard from "@components/jobs/JobCard";
import { AppText } from "@components/ui";
import { useSearchJobs } from "@queries/homeQuries";
import { useFilterStore } from "@store/filterStore";
import { useSearchStore } from "@store/searchStore";
import { getCleanedFilters } from "@utils";
import React from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

const SearchResults = () => {
  const { filters } = useFilterStore();
  const { searchText } = useSearchStore();

  const queryFilters = {
    ...filters,
    title: searchText,
  };

  const cleanedQueryFilters = getCleanedFilters(queryFilters);

  const { data, isPending, isFetching } = useSearchJobs(cleanedQueryFilters);

  if (!data || isPending) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const { data: jobs, message, totalCount, pageNumber, pageSize } = data || {};
  console.log("search data: ", jobs, message);

  return (
    <View className="flex-1">
      <AppText className="pt-2 px-4">{totalCount} Result{totalCount > 1 && "s"} Found</AppText>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <JobCard item={item} />}
        contentContainerClassName="py-4 gap-4 px-4"
        // onEndReached={() => hasNextPage && !isFetching && fetchNextPage()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isPending ? (
            <ActivityIndicator size="small" />
          ) : (
            <View>
              <AppText className="text-center">no more jobs</AppText>
            </View>
          )
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default SearchResults;
