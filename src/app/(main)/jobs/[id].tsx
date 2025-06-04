import { AppButton, AppText } from "@components/ui";
import { useLocalSearchParams, router } from "expo-router";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@contexts/ThemeContext";
import { useSafeArea } from "@hooks/useSafeArea";
import { useState, useEffect } from "react";
import jobService from "@api/services/jobService";
import AboutTab from "@components/jobs/detailsTabs/AboutTab";
import CompanyTab from "@components/jobs/detailsTabs/CompanyTab";
import ReviewTab from "@components/jobs/detailsTabs/ReviewTab";
import { useJobById } from "queries/jobQueries";
import { formatSalary } from "@utils";

const JobDetails = () => {
  const { id } = useLocalSearchParams();
  const { colors } = useTheme();
  const { top } = useSafeArea();
  const [activeTab, setActiveTab] = useState<'about' | 'company' | 'review'>('about');
  // const [jobDetails?, setJobDetails?] = useState<any>(null);
  const { data: jobDetails, isPending, error} = useJobById(Number(id));
  console.log('data here: ', jobDetails);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await jobService.fetchJobById(Number(id));
  //       setJobDetails?(response.data);
  //     } catch (error) {
  //       console.log("Error fetching job details:", error);
  //     }
  //   })();
  // }, [id]);

  if (isPending) {
    return (
      <View className="flex-1 items-center justify-center">
        <AppText>Loading...</AppText>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center">
        <AppText>Oops..error occured please try again</AppText>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[--bg-color]" style={{paddingTop: top}}>
      {/* Header */}
      <View className="flex-row justify-between items-center p-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors["--text-primary"]} />
        </TouchableOpacity>
        <View className="flex-row gap-4">
          <TouchableOpacity>
            <Ionicons name="bookmark-outline" size={24} color={colors["--text-primary"]} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="share-social-outline" size={24} color={colors["--text-primary"]} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Company Info */}
        <View className="items-center py-4">
          <View className="w-20 h-20 rounded-full bg-[--accent-color] items-center justify-center mb-4">
            <AppText className="text-white text-3xl">{jobDetails?.employer?.companyName[0]}.</AppText>
          </View>
          <AppText variant="medium" className="text-xl mb-1">{jobDetails?.title}</AppText>
          <AppText className="color-[--text-muted] mb-1">{jobDetails?.employer?.companyName}</AppText>
          <View className="flex-row items-center gap-2">
            <Ionicons name="location" size={16} color={colors["--accent-color"]} />
            <AppText className="color-[--text-muted]">{jobDetails?.location}</AppText>
          </View>
        </View>

        {/* Job Details Grid */}
        <View className="flex-row flex-wrap justify-between px-4 py-2">
          <View className="w-[48%] bg-[--card-color] p-4 rounded-xl mb-4">
            <View className="flex-row items-center gap-2 mb-2">
              <Ionicons name="wallet-outline" size={20} color={colors["--accent-color"]} />
              <AppText className="color-[--text-muted]">Salary ({jobDetails?.salaryType})</AppText>
            </View>
            <AppText className='text-center'>${formatSalary(jobDetails?.minSalary)}k - ${formatSalary(jobDetails?.maxSalary)}k</AppText>
          </View>

          <View className="w-[48%] bg-[--card-color] p-4 rounded-xl mb-4">
            <View className="flex-row items-center gap-2 mb-2">
              <Ionicons name="briefcase-outline" size={20} color={colors["--accent-color"]} />
              <AppText className="color-[--text-muted]">Job Type</AppText>
            </View>
            <AppText className='text-center'>Full - Time</AppText>
          </View>

          <View className="w-[48%] bg-[--card-color] p-4 rounded-xl mb-4">
            <View className="flex-row items-center gap-2 mb-2">
              <Ionicons name="desktop-outline" size={20} color={colors["--accent-color"]} />
              <AppText className="color-[--text-muted]">Working Model</AppText>
            </View>
            <AppText className='text-center'>Remote</AppText>
          </View>

          <View className="w-[48%] bg-[--card-color] p-4 rounded-xl mb-4">
            <View className="flex-row items-center gap-2 mb-2">
              <Ionicons name="stats-chart" size={20} color={colors["--accent-color"]} />
              <AppText className="color-[--text-muted]">Level</AppText>
            </View>
            <AppText className='text-center'>Internship</AppText>
          </View>
        </View>

        {/* Tabs */}
        <View className="flex-row border-b border-[--border-color] justify-center">
          {['about', 'company', 'review'].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab as typeof activeTab)}
              className={`pb-2 items-center flex-1 ${activeTab === tab ? 'border-b-2 border-[--accent-color]' : ''}`}
            >
              <AppText
                variant="medium"
                className={activeTab === tab ? 'color-[--accent-color]' : 'color-[--text-muted]'}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        {activeTab === 'about' && <AboutTab job={jobDetails} />}
        {activeTab === 'company' && <CompanyTab employer={jobDetails?.employer} />}
        {activeTab === 'review' && <ReviewTab />}
      </ScrollView>

      {/* Apply Button */}
      <View className="p-4 bg-[--card-color]">
        <AppButton 
          title="Apply for Job" 
          variant="primary" 
          className="bg-[--accent-color]"
        />
      </View>
    </View>
  );
};

export default JobDetails;
