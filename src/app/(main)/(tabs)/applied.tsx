import JobCard from "@components/jobs/JobCard";
import { AppText } from "@components/ui";
import { hs, vs } from "@constants/metrics";
import { useAppliedJobs } from "queries/userQueries";
import React from "react";
import { FlatList, View } from "react-native";

const Applied = () => {
  const { data, isPending } = useAppliedJobs();
  console.log('data here: ', data);

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
