import { AppButton, AppIcon, AppText } from "@components/ui";
import { useTheme } from "@contexts/ThemeContext";
import { useWithAuth } from "@hooks/useWithAuth";
import { JobDetails } from "@type/jobTypes";
import { extractTags } from "@utils";
import { usePathname, useRouter } from "expo-router";
import { useSaveJob, useUnsaveJob } from "queries/jobQueries";
import React, { ReactNode, useState } from "react";
import {
  Pressable,
  PressableProps,
  ScrollView,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import JobFooter from "./JobFooter";
import JobTags from "./JobTags";
import JobHeader from "./JobHeader";
import JobMeta from "./JobMeta";

interface JobCardProps extends PressableProps {
  item: JobDetails;
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
  const pathName = usePathname();
  const { requireAuth } = useWithAuth();
  const { mutate: saveJob } = useUnsaveJob();
  const { mutate: unsaveJob } = useSaveJob();
  const isInSavedPage = pathName.includes("saved");
  const [isSaved, setIsSaved] = useState(isInSavedPage);

  const handleJobPress = () => {
    router.push({
      pathname: "/jobs/[id]",
      params: { id: item.id },
    });
  };

  const handleToggleSave = async () => {
    if (!requireAuth()) return;

    try {
      if (isSaved) {
        unsaveJob(item.id);
      } else {
        saveJob(item.id);
      }
      setIsSaved(!isSaved);
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
          isSaved={isSaved}
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
