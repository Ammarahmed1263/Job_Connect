import { AppButton, AppText } from "@components/ui";
import { width } from "@constants/metrics";
import useAuthStore from "@store/authStore";
import { jobSummary } from "@type/jobTypes";
import React from "react";
import { FlatList, View } from "react-native";
import JobCard from "./JobCard";

interface JobSectionProps {
  title: string;
  subtitle: string;
  data?: jobSummary[];
  onSeeAll: () => void;
}

const JobSection = ({ title, subtitle, data, onSeeAll }: JobSectionProps) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  if (!isAuthenticated) return null;

  if (!data) {
    return <AppText className="text-center">Loading...</AppText>;
  }

  if (data.length === 0) {
    return null;
  }

  return (
    <View className="py-4">
      <View className="px-4 mb-4 flex-row justify-between items-center">
        <View>
          <AppText variant="medium" className="text-xl">
            {title}
          </AppText>
          <AppText variant="light" className="color-[--text-muted]">
            {subtitle}
          </AppText>
        </View>
        <AppButton
          variant="primary"
          title="See all"
          textClassName="color-[--accent-color]"
          onPress={onSeeAll}
          flat
        />
      </View>

      <FlatList
        data={data.slice(0, 6)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <JobCard item={item} wrapperStyle={{width: width - width * 0.15}}/>}
        contentContainerClassName="pb-4 gap-4 px-4 items-center"
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </View>
  );
};

export default JobSection;
