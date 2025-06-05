import JobCard from "@components/jobs/JobCard";
import { AppText } from "@components/ui";
import { hs, vs } from "@constants/metrics";
import { useWithAuth } from "@hooks/useWithAuth";
import useAuthStore from "@store/authStore";
import { useSavedJobs } from "queries/userQueries";
import React from "react";
import { FlatList, View } from "react-native";

const Saved = () => {
  // const { requireAuth } = useWithAuth();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const { data, isFetching } = useSavedJobs(isAuthenticated);
  console.log("saved jobs: ", data);

  if (!isAuthenticated) {
    return (
      <View className="flex-1 items-center justify-center">
        <AppText>You are not authenticated</AppText>
      </View>
    );
  }

  // const handleSaveJob = async (id: number) => {
  //   if (!requireAuth()) return;
  //   try {
  //     console.log("save job");
  //     const response = await jobService.saveJob(id);
  //     console.log('response', response);
  //   } catch (error) {
  //     console.log('error saving job occured', error);
  //   }
  // };

  // const handleRemoveJob = async (id: number) => {
  //   if (!requireAuth()) return;
  //   try {
  //     console.log("save job");
  //     const response = await jobService.unsaveJob(id);
  //     setData((prevData: any) =>
  //       prevData
  //         ? (prevData as Array<{ id: number }>).filter((job) => job.id !== id)
  //         : null
  //     );
  //     console.log("response", response);
  //   } catch (error) {
  //     console.log("error saving job occured", error);
  //   }
  // };

  if (isFetching)
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
