import { AppButton, AppText } from "@components/ui";
import React from "react";
import { FlatList, View } from "react-native";
import JobCard from "./JobCard";
import { hs, width } from "@constants/metrics";
import useAuthStore from "@store/authStore";

interface JobSectionProps {
  title: string;
  subtitle: string;
  data: any[];
  onSeeAll: () => void;
}

const JobSection = ({ title, subtitle, data, onSeeAll }: JobSectionProps) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  if (!isAuthenticated) return null;

  if (!data) {
    return <AppText className="text-center">Loading...</AppText>;
  }

  if (data.length === 0) {
    return <AppText className="text-center">Sorry...section not available now</AppText>;
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
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <JobCard item={item} wrapperStyle={{width: width - width * 0.15}}/>}
        contentContainerStyle={{ paddingHorizontal: hs(15), gap: hs(10) }}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </View>
  );
};

export default JobSection;
