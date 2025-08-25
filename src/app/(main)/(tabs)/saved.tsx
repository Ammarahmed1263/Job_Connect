import JobCard from "@components/jobs/JobCard";
import JobCardSkeleton from "@components/jobs/JobCardSkeleton";
import { AppText, NavigationHeader, UnauthorizedPlaceholder } from "@components/ui";
import { vs } from "@constants/metrics";
import { TAB_HEIGHT } from "@constants/tabBar";
import useSavedJobs from "@hooks/useSavedJobs";
import { useFetchSavedJobs } from "@queries/userQueries";
import useAuthStore from "@store/authStore";
import React, { useEffect } from "react";
import { FlatList, View } from "react-native";

const Saved = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { setSavedJobs } = useSavedJobs();
  const { data, isPending, isSuccess } = useFetchSavedJobs(isAuthenticated);

  useEffect(() => {
    if (isSuccess && data?.data) {
      setSavedJobs(data.data);
    }
  }, [isSuccess, data?.data, setSavedJobs]);

  if (!isAuthenticated) {
    return (
      <UnauthorizedPlaceholder 
        title="Saved Jobs" 
        message="Login to save your favorite jobs and access them anytime, anywhere."
        icon="bookmark-outline"
      />
    );
  }

  return (
    <View className="flex-1">
      <NavigationHeader showBackButton={false} title="Saved Jobs" />
      <FlatList
        data={data?.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <JobCard item={item} />}
        ListEmptyComponent={() =>
          !isPending ? (
            <View className="flex-1 justify-center items-center">
              <AppText className="text-center">No jobs saved</AppText>
            </View>
          ) : (
            <View className="gap-4">
              <JobCardSkeleton />
              <JobCardSkeleton />
              <JobCardSkeleton />
              <JobCardSkeleton />
              <JobCardSkeleton />
            </View>
          )
        }
        showsVerticalScrollIndicator={false}
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
