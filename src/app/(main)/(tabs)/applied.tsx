import JobCard from "@components/jobs/JobCard";
import { AppText, NavigationHeader } from "@components/ui";
import { hs, vs } from "@constants/metrics";
import useAuthStore from "@store/authStore";
import { useAppliedJobs } from "@queries/userQueries";
import React from "react";
import { FlatList, View } from "react-native";

const Applied = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { data, isPending } = useAppliedJobs(isAuthenticated);
  console.log("data here: ", data);

  if (!isAuthenticated)
    return (
      <View className="flex-1 items-center justify-center">
        <AppText>You are not authenticated</AppText>
      </View>
    );

  if (isPending)
    return (
      <View className="flex-1 items-center justify-center">
        <AppText>loading...</AppText>
      </View>
    );

  return (
    <View className="flex-1">
      <NavigationHeader showBackButton={false} title="Applied Jobs" />
      <FlatList
        data={data?.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <JobCard
            item={item}
            rightComponent={
              <View className="bg-[--accent-color] py-1 px-4 rounded-sm">
                <AppText className="color-[--bg-color]" variant="light">
                  {item?.status}
                </AppText>
              </View>
            }
            compact
          />
        )}
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center">
          <AppText className="text-center">No Applied Jobs Yet</AppText>
          </View>
        )}
        contentContainerClassName="pt-2 pb-4 gap-4 px-4 grow"
      />
    </View>
  );
};

export default Applied;
