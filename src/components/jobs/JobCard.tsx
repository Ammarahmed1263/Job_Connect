import { useWithAuth } from "@hooks/useWithAuth";
import { jobSummary } from "@type/jobTypes";
import { extractTags } from "@utils";
import { useRouter } from "expo-router";
import React, { ReactNode } from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import JobFooter from "./JobFooter";
import JobHeader from "./JobHeader";
import JobMeta from "./JobMeta";
import JobTags from "./JobTags";
import useSavedJobs from "@hooks/useSavedJobs";

interface JobCardProps extends PressableProps {
  item: jobSummary;
  compact?: boolean;
  rightComponent?: ReactNode;
  wrapperStyle?: StyleProp<ViewStyle>;
}

const JobCard = ({
  item,
  wrapperStyle,
  compact,
  rightComponent,
  ...props
}: JobCardProps) => {
  const router = useRouter();
  const { requireAuth } = useWithAuth();
  const { isSaved, saveJob, unsaveJob} = useSavedJobs();

  const handleJobPress = () => {
    router.push({
      pathname: "/jobs/[id]",
      params: { id: item.id },
    });
  };

  const handleToggleSave = async () => {
    if (requireAuth()) return;

    try {
      isSaved(item.id) ? unsaveJob(item.id) : saveJob(item);
    } catch (error) {
      console.log("Error toggling job save:", error);
    }
  };

  return (
    <View
      className="p-4 rounded-2xl border border-[--accent-color]"
      style={wrapperStyle}
    >
      <Pressable onPress={handleJobPress} {...props}>
        <JobHeader
          item={item}
          isSaved={isSaved(item.id)}
          onToggleSave={handleToggleSave}
          rightComponent={rightComponent}
        />

        <JobMeta location={item?.location} postedDate={item?.postedDate} />
      </Pressable>

      <JobTags tags={extractTags(item)} />

      {!compact && (
        <Pressable onPress={handleJobPress}>
          <JobFooter
            applicationsCount={item?.applicationsCount}
            salaryType={item?.salaryType}
            minSalary={item?.minSalary}
            maxSalary={item?.maxSalary}
          />
        </Pressable>
      )}
    </View>
  );
};

export default JobCard;
