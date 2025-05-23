import { AppButton, AppText } from "@components/ui";
import { AppIcon } from "@components/ui";
import { hs, width } from "@constants/metrics";
import { useTheme } from "@contexts/ThemeContext";
import Icon from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  PressableProps,
  ScrollView,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import jobService from "@api/services/jobService";
import { useWithAuth } from "@hooks/useWithAuth";
import clsx from "clsx";

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
  const { requireAuth } = useWithAuth();
  const [isSaved, setIsSaved] = useState(item.shortListed);

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
        await jobService.unsaveJob(item.id);
      } else {
        await jobService.saveJob(item.id);
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
              name="location-outline"
              size={24}
              color={colors["--text-muted"]}
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
            {item?.minSalary >= 1000 ? item?.minSalary / 1000 : item?.minSalary}
            k - $
            {item?.maxSalary >= 1000 ? item?.maxSalary / 1000 : item?.maxSalary}
            k / {item?.salaryType}
          </AppText>
        </View>
      </Pressable>
    </View>
  );
};

export default JobCard;
