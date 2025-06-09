import { View, Text, ActivityIndicator, FlatList } from "react-native";
import React from "react";
import { AppText } from "@components/ui";
import JobCard from "@components/jobs/JobCard";
import { hs, vs } from "@constants/metrics";
import { useSearchJobs } from "@queries/homeQuries";
import { useSearchStore } from "@store/searchStore";

const SearchResults = () => {
  const { searchText } = useSearchStore();

  const { data, isFetching } = useSearchJobs({ title: searchText });
  const { data: jobs, message } = data || {};
  console.log("search data: ", jobs, message);

  return (
    <View className="flex-1">
      <AppText className="pt-2 px-4">n Results Found</AppText>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <JobCard item={item} />}
        contentContainerClassName="py-4 gap-4 px-4"
        // onEndReached={() => hasNextPage && !isFetching && fetchNextPage()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetching ? (
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
