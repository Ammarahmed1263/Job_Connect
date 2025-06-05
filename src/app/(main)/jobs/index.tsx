import JobCard from "@components/jobs/JobCard";
import { AppText } from "@components/ui";
import { hs, vs } from "@constants/metrics";
import useAuthStore from "@store/authStore";
import { JobDetails } from "@type/jobTypes";
import { secureStorage } from "lib/storage/secureStorage";
import { useJobs } from "queries/jobQueries";
import React, { useEffect, useRef } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

const JobListing = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useJobs(4);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const transformedData = data?.pages.flatMap((page) => page.data) || [];
  console.log("data here: ", data);

  if (!isAuthenticated) {
    return (
      <View className="flex-1 items-center justify-center bg-red-200">
        <AppText>You are not authenticated</AppText>
      </View>
    );
  }

  return (
    <View className="flex-1 pt-14">
      <AppText variant="bold" className="text-center py-2">
        All Jobs
      </AppText>
      <FlatList
        data={transformedData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <JobCard item={item} wrapperStyle={{ width: "100%" }} />
        )}
        contentContainerStyle={{
          paddingHorizontal: hs(15),
          gap: hs(10),
          paddingBottom: vs(20),
        }}
        onEndReached={() => hasNextPage && !isFetching && fetchNextPage()}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          hasNextPage ? (
            <ActivityIndicator size="small" />
          ) : ( 
            <View>
              <AppText className="text-center">no more jobs</AppText>
            </View>
          )
        }
      />
    </View>
  );
};

export default JobListing;
