import JobCard from "@components/jobs/JobCard";
import { AppText } from "@components/ui";
import { useSearchJobs } from "@queries/homeQuries";
import { useSearchStore } from "@store/searchStore";
import React from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

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
