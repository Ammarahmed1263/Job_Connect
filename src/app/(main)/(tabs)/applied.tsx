import JobCard from "@components/jobs/JobCard";
import JobCardSkeleton from "@components/jobs/JobCardSkeleton";
import { AppText, NavigationHeader } from "@components/ui";
import { vs } from "@constants/metrics";
import { TAB_HEIGHT } from "@constants/tabBar";
import { useTheme } from "@contexts/ThemeContext";
import { useAppliedJobs } from "@queries/userQueries";
import useAuthStore from "@store/authStore";
import { applyOpacity, statusColorSelector } from "@utils";
import React from "react";
import { FlatList, View } from "react-native";

const Applied = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { data, isPending } = useAppliedJobs(isAuthenticated);
  const { colors } = useTheme();

  if (!isAuthenticated)
    return (
      <View className="flex-1 items-center justify-center">
        <AppText>You are not authenticated</AppText>
      </View>
    );

  return (
    <View className="flex-1">
      <NavigationHeader showBackButton={false} title="Applied Jobs" />
      <FlatList
        data={data?.data.reverse()}
        keyExtractor={(item, index) => item.id.toString() + index.toString()}
        renderItem={({ item }) => {
          const color = statusColorSelector(item?.applicants[0]?.status);
          return (
            <JobCard
              item={item}
              rightComponent={
                <View
                  className={"py-1 px-2 rounded-lg"}
                  style={{
                    backgroundColor: applyOpacity(colors[color], 0.2),
                  }}
                >
                  <AppText
                    variant="light"
                    className={"!leading-tight !text-lg"}
                    style={{ color: colors[color] }}
                  >
                    {item?.applicants[0]?.status}
                  </AppText>
                </View>
              }
              compact
            />
          );
        }}
        ListEmptyComponent={() =>
          !isPending ? (
            <View className="flex-1 justify-center items-center">
              <AppText className="text-center">No Applied Jobs Yet</AppText>
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

export default Applied;
