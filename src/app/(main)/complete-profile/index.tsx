import {
  ProfileCompletionProgress,
  ProfileSectionItem,
} from "@components/complete-profile";
import { NavigationHeader } from "@components/ui";
import { vs } from "@constants/metrics";
import profileSectionsData from "@constants/profileSections";
import { useProfileStore } from "@store/profileStore";
import { ProfileSection } from "@type/profileSectionTypes";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";

const CompleteProfileScreen = () => {
  const router = useRouter();
  const { totalFields, completedFields, getSectionProgress } =
    useProfileStore();

  const handleSectionPress = (item: ProfileSection) => {
    if (item.screen) {
      router.push(`/complete-profile/${item.screen}`);
    } else {
      console.log(`section with name ${item.sectionName} has no screen`);
    }
  };

  return (
    <View className="flex-1 bg-[--bg-color]">
      <NavigationHeader title="Your Profile" style={{ marginTop: vs(10) }} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileCompletionProgress
          completed={completedFields}
          total={totalFields}
        />
        <View className="mt-2 mb-4">
          {profileSectionsData.map((item) => {
            const { total, completed } = getSectionProgress(item.sectionValue);
            return (
              <ProfileSectionItem
                key={item.id}
                item={item}
                completedFields={completed}
                totalFields={total}
                onPress={() => handleSectionPress(item)}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default CompleteProfileScreen;
