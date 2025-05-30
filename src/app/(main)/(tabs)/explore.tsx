import jobService from "@api/services/jobService";
import JobSection from "@components/jobs/JobSection";
import { AppIcon, AppText } from "@components/ui";
import { useTheme } from "@contexts/ThemeContext";
import { useEffect, useState } from "react";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";

const Explore = () => {
  const [jobs, setJobs] = useState<any>(null);
  const { colors } = useTheme();

  useEffect(() => {
    (async () => {
      try {
        const response = await jobService.fetchAllJobs();
        console.log("response: ", response.data);
        setJobs(response.data);
      } catch (error) {
        console.log("failed to get all jobs", error);
      }
    })();
  }, []);

  // if (!isAuthenticated) {
  //   return null;
  // }

  const handleSeeAll = () => {
    // router.push("/jobs");
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
          onPress={() => {/* Handle notification press */}}
        >
          <AppIcon
            name="bell"
            color={colors["--text-primary"]}
            size={30}
          />
          <View 
            className="absolute end-3 top-2 w-3 h-3 rounded-full bg-[--error-color]" 
          />
        </TouchableOpacity>
      </View>
      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <JobSection
          title="Suggested Jobs"
          subtitle="Based on your preferences"
          data={jobs}
          onSeeAll={handleSeeAll}
        />

        <JobSection
          title="Recent Jobs"
          subtitle="Find your next opportunity"
          data={jobs}
          onSeeAll={handleSeeAll}
        />

        <JobSection
          title="Trending Jobs"
          subtitle="Find market direction"
          data={jobs}
          onSeeAll={handleSeeAll}
        />

        <JobSection
          title="Big Companies Jobs"
          subtitle="Level Up your next opportunity"
          data={jobs}
          onSeeAll={handleSeeAll}
        />

        {/* <JobCard
        item={{
          applicationsCount: 1,
          daysRemaining: 0,
          description: "vsdvdsv",
          // education: "master",
          employer: { id: "5", name: 'ali', email: 'string', companyName: 'string', companySize: 'string', industry: 'string', logoBase64: null, },
          // experience: "",
          id: 13,
          jobType: "fullTime",
          location: "Cairo, EGY",
          maxSalary: 20003,
          minSalary: 4000,
          postedDate: "1 week ago",
          // responsibilities: [],
          salaryType: "monthly",
          shortListed: false,
          status: "active",
          tags: ["test", "hello", "world"],
          title: "front end",
          // vacancies: 3,
        }}
      /> */}
      </ScrollView>
    </>
  );
};

export default Explore;
