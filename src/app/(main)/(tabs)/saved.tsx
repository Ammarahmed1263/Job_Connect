import jobService from "@api/services/jobService";
import userService from "@api/services/userService";
import { AppButton, AppText } from "@components/ui";
import { hs, vs } from "@constants/metrics";
import { useTheme } from "@contexts/ThemeContext";
import { useWithAuth } from "@hooks/useWithAuth";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import JobCard from "@components/jobs/JobCard";

const Saved = () => {
  const { requireAuth } = useWithAuth();
  const { colors } = useTheme();
  const [data, setData] = useState<any>(null);
  console.log("data here: ", data);

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

  const handleRemoveJob = async (id: number) => {
    if (!requireAuth()) return;
    try {
      console.log("save job");
      const response = await jobService.unsaveJob(id);
      setData((prevData: any) =>
        prevData
          ? (prevData as Array<{ id: number }>).filter((job) => job.id !== id)
          : null
      );
      console.log("response", response);
    } catch (error) {
      console.log("error saving job occured", error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await userService.fetchSavedJobs();
        setData(data.data);
      } catch (error) {
        console.log("fetch failed", error);
      }
    })();
  }, []);

  // if (!data)
  //   return (
  //     <View className="flex-1 items-center justify-center">
  //       <AppText>loading...</AppText>
  //     </View>
  //   );

  return (
    <View>
      <AppText variant="bold" className="text-center">
        Saved Jobs
      </AppText>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <JobCard item={item} />
        )}
        ListEmptyComponent={() => (
          <AppText className="text-center">No jobs saved</AppText>
        )}
        style={{ marginTop: vs(20) }}
        contentContainerStyle={{
          gap: vs(25),
          paddingHorizontal: hs(15),
        }}
      />
    </View>
  );
};

export default Saved;
