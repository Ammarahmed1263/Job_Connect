import JobCard from "@components/jobs/JobCard";
import { AppText } from "@components/ui";
import { hs, vs } from "@constants/metrics";
import useAuthStore from "@store/authStore";
import { useAppliedJobs } from "queries/userQueries";
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
      <AppText variant="bold" className="text-center">
        {data?.message}
      </AppText>
      <FlatList
        data={data?.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <JobCard
            item={item}
            rightComponent={
              <View className="bg-[--accent-color] p-1 rounded-lg">
                <AppText className='color-[--bg-color]' variant="light">status</AppText>
              </View>
            }
            compact
          />
        )}
        ListEmptyComponent={() => (
          <AppText className="text-center">No Applied Jobs Yet</AppText>
        )}
        contentContainerStyle={{
          gap: vs(25),
          paddingHorizontal: hs(15),
          paddingVertical: vs(20),
        }}
      />
    </View>
  );
};

export default Applied;
