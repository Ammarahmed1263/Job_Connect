import { AppIcon, AppText } from "@components/ui";
import { useTheme } from "@contexts/ThemeContext";
import Icon from "@expo/vector-icons/Ionicons";
import { useWithAuth } from "@hooks/useWithAuth";
import { formatSalary } from "@utils";
import clsx from "clsx";
import { usePathname, useRouter } from "expo-router";
import { useSaveJob, useUnsaveJob } from "queries/jobQueries";
import { useSavedJobs } from "queries/userQueries";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  View,
  ViewStyle
} from "react-native";

interface JobCardProps extends PressableProps {
  item: {
    id: number;
    title: string;
    status: string;
    jobType: string;
    daysRemaining: number;
    applicationsCount: number;
    postedDate: string;
    location: string;
    shortListed: boolean;
    description: string;
    minSalary: number;
    maxSalary: number;
    salaryType: string;
    tags: string[];
    employer: {
      id: string;
      name: string;
      email: string;
      companyName: string;
      companySize: string;
      industry: string;
      logoBase64: string | null;
    };
  };
  wrapperStyle?: StyleProp<ViewStyle>;
}

const JobCard = ({ item, wrapperStyle, ...props }: JobCardProps) => {
  const { colors } = useTheme();
  const router = useRouter();
  const pathName = usePathname();
  const { requireAuth } = useWithAuth();
  const { mutate: saveJob } = useUnsaveJob();
  const { mutate: unsaveJob } = useSaveJob();
  // Remove this line as we don't need to fetch saved jobs again
  // const {data} = useSavedJobs();
  
  // Instead, use a simple useState without depending on saved jobs data
  const [isSaved, setIsSaved] = useState(false);

  // Use useEffect to set initial saved state based on props
  useEffect(() => {
    // If the job is being rendered in the Saved screen, it must be saved
    if (pathName.includes('saved')) {
      setIsSaved(true);
    }
  }, []);

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
      className="p-4 rounded-2xl border border-[--primary-300]"
      style={wrapperStyle}
    >
      <Pressable onPress={handleJobPress} {...props}>
        <View className="flex-row justify-between items-center">
          <View className="flex-row gap-3 flex-1 ">
            <View className="w-16 h-16 bg-[--primary-100] rounded-xl items-center justify-center">
              <AppText
                variant="bold"
                className="text-[--bg-color] leading-none"
              >
                {item?.employer?.companyName[0]}.
              </AppText>
            </View>
            <View className="flex-1 pe-2">
              <AppText numberOfLines={1} variant="medium">
                {item.title}
              </AppText>
              <AppText
                numberOfLines={1}
                variant="light"
                className="text-sm color-[--text-muted]"
              >
                {item?.employer?.companyName}
              </AppText>
            </View>
          </View>
          <Pressable onPress={handleToggleSave} hitSlop={10}>
            <AppIcon
              name={isSaved ? "bookmark" : "bookmark-outline"}
              color={colors["--text-primary"]}
              size={26}
            />
          </Pressable>
        </View>

        <View className="flex-row justify-between items-center mt-4">
          <View className="flex-row items-center ">
            <Icon
              name="location"
              size={24}
              color={colors["--primary-300"]}
            />
            <AppText
              numberOfLines={1}
              variant="light"
              className="ms-1 color-[--text-muted]"
            >
              {item?.location}
            </AppText>
          </View>

          <View>
            <AppText
              numberOfLines={1}
              variant="light"
              className="color-[--text-muted]"
            >
              {item?.postedDate}
            </AppText>
          </View>
        </View>
      </Pressable>

      {/* <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="gap-2 mt-4"
            contentContainerStyle={{ gap: 10, paddingHorizontal: hs(10) }}
          >
            {item.tags.map((tag, i) => (
                <AppButton
                  key={tag + i}
                  variant="secondary"
                  title={tag}
                  wrapperClassName="bg-[--text-muted] rounded-none"
                  wrapperStyle={{
                    width: (300 - 72) / 3,
                  }}
                  textClassName="!px-2"
                  disabled
                />
              ))}
          </ScrollView>
        </View> */}

      <Pressable onPress={handleJobPress}>
        <View className="flex-row justify-between items-center mt-4 border-t-[1px] border-[--text-muted] pt-4">
          <View className="items-center me-2">
            <View className="flex-row ms-3">
              {[1, 2, 3].map((_, i) => (
                <View
                  key={i}
                  className={clsx(
                    "w-8 h-8 rounded-full bg-[--primary-300] border-[--bg-color] border-2",
                    "-ml-3"
                  )}
                />
              ))}
            </View>
            <AppText
              numberOfLines={1}
              variant="light"
              className="ml-2 color-[--text-muted] !text-sm"
            >
              {item?.applicationsCount} Applicants
            </AppText>
          </View>
          <AppText
            variant="light"
            className="flex-1 text-right color-[--text-primary]"
          >
            $
            {formatSalary(item?.minSalary)}
            k - $
            {formatSalary(item?.maxSalary)}
            k / {item?.salaryType}
          </AppText>
        </View>
      </Pressable>
    </View>
  );
};

export default JobCard;
