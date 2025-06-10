import JobCard from "@components/jobs/JobCard";
import { AppText, NavigationHeader } from "@components/ui";
import { useTheme } from "@contexts/ThemeContext";
import { useAppliedJobs } from "@queries/userQueries";
import useAuthStore from "@store/authStore";
import { applyOpacity, statusColorSelector } from "@utils";
import React from "react";
import { FlatList, View } from "react-native";

const Applied = () => {
  const { isAuthenticated } = useAuthStore((state) => state);
  const { data, isPending } = useAppliedJobs(isAuthenticated);
  const { colors } = useTheme();

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
        keyExtractor={(item, index) => item.id.toString() + index.toString()}
        renderItem={({ item }) => {
          const { backgroundColorClass, textColorClass } = statusColorSelector(
            item?.applicants[0]?.status
          );
          return (
            <JobCard
              item={item}
              rightComponent={
                <View
                  className={"p-2 ms-2 rounded-lg"}
                  style={{
                    backgroundColor: applyOpacity(
                      colors[backgroundColorClass],
                      0.3
                    ),
                  }}
                >
                  <AppText
                    variant="semiBold"
                    className={"!leading-tight !text-lg"}
                    style={{ color: colors[textColorClass] }}
                  >
                    {item?.applicants[0]?.status}
                  </AppText>
                </View>
              }
              compact
            />
          );
        }}
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
