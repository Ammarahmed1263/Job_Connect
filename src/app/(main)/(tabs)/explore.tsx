import JobSection from "@components/jobs/JobSection";
import { AppIcon, AppText } from "@components/ui";
import { useTheme } from "@contexts/ThemeContext";
import useAuthStore from "@store/authStore";
import { useRouter } from "expo-router";
import { useJobs } from "queries/jobQueries";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";

const Explore = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { data, isError, isFetching } = useJobs(4, isAuthenticated);
  console.log("---> Explore data: ", data);

  if ((!isAuthenticated && !isFetching) || isError) {
    return (
      <View className="flex-1 items-center justify-center">
        <AppText>You are not authenticated</AppText>
      </View>
    );
  }

  const handleSeeAll = () => {
    router.push("/jobs");
  };

  return (
    <>
      <View className="w-full flex-row px-4 py-6 gap-4 justify-center">
        <TextInput
          className="flex-1 border-2 border-[--text-primary] p-2 rounded-lg"
          placeholder="Search for jobs"
          placeholderTextColor={colors["--text-primary"]}
        />
        <TouchableOpacity
          className="rounded-lg bg-[--accent-color] p-2 items-center justify-center"
          onPress={() => {
            /* Handle notification press */
          }}
        >
          <AppIcon name="bell" color={colors["--text-primary"]} size={30} />
          <View className="absolute end-3 top-2 w-3 h-3 rounded-full bg-[--error-color]" />
        </TouchableOpacity>
      </View>
      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <JobSection
          title="Suggested Jobs"
          subtitle="Based on your preferences"
          // @ts-ignore
          data={data?.pages[0]?.data}
          onSeeAll={handleSeeAll}
        />

        <JobSection
          title="Recent Jobs"
          subtitle="Find your next opportunity"
          // @ts-ignore
          data={data?.pages[0]?.data}
          onSeeAll={handleSeeAll}
        />

        <JobSection
          title="Trending Jobs"
          subtitle="Find market direction"
          // @ts-ignore
          data={data?.pages[0]?.data}
          onSeeAll={handleSeeAll}
        />

        <JobSection
          title="Big Companies Jobs"
          subtitle="Level Up your next opportunity"
          // @ts-ignore
          data={data?.pages[0]?.data}
          onSeeAll={handleSeeAll}
        />
      </ScrollView>
    </>
  );
};

export default Explore;
