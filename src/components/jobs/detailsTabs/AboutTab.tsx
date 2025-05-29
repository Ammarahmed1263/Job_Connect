import { AppText } from "@components/ui";
import { View } from "react-native";
import { JobDetails } from "@type/jobTypes";

interface AboutTabProps {
  job: JobDetails;
}

const AboutTab = ({ job }: AboutTabProps) => {
  return (
    <View className="p-4">
      <AppText variant="medium" className="text-lg mb-2">About this Job</AppText>
      <AppText className="color-[--text-muted] mb-4">
        {job?.description}
        <AppText className="color-[--accent-color]"> Read more</AppText>
      </AppText>

      <AppText variant="medium" className="text-lg mb-2">Job Description</AppText>
      <View className="gap-2">
        {job?.responsibilities?.map((responsibility, index) => (
          <View key={index} className="flex-row gap-2">
            <AppText>•</AppText>
            <AppText className="color-[--text-muted]">{responsibility}</AppText>
          </View>
        ))}
      </View>
    </View>
  );
};

export default AboutTab;