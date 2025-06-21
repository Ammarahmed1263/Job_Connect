import JobCard from "@components/jobs/JobCard";
import { AppText, NavigationHeader } from "@components/ui";
import { vs } from "@constants/metrics";
import { TAB_HEIGHT } from "@constants/tabBar";
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
      <NavigationHeader showBackButton={false} title="Saved Jobs"/>
      <FlatList
        data={data?.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <JobCard item={item} />}
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center">
          <AppText className="text-center">No jobs saved</AppText>
          </View>
        )}
        contentContainerClassName="pt-2 pb-4 gap-4 px-4 grow"
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: TAB_HEIGHT + vs(20),
          paddingTop: vs(20),
        }}
      />
    </View>
  );
};

export default Saved;
