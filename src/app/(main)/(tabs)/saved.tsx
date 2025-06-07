import JobCard from "@components/jobs/JobCard";
import { AppText } from "@components/ui";
import { hs, vs } from "@constants/metrics";
import { useSavedJobs } from "@queries/userQueries";
import useAuthStore from "@store/authStore";
import React from "react";
import { FlatList, View } from "react-native";

const Saved = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const { data, isPending } = useSavedJobs(isAuthenticated);
  console.log("saved jobs: ", data);

  if (!isAuthenticated) {
    return (
      <View className="flex-1 items-center justify-center">
        <AppText>You are not authenticated</AppText>
      </View>
    );
  }

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
        renderItem={({ item }) => <JobCard item={item} />}
        ListEmptyComponent={() => (
          <AppText className="text-center">No jobs saved</AppText>
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

export default Saved;
