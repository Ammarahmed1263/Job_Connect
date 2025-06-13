import {
  ProfileCompletionProgress,
  ProfileSectionItem,
} from "@components/complete-profile";
import { NavigationHeader } from "@components/ui";
import { vs } from "@constants/metrics";
import profileSectionsData from "@constants/profileSections";
import { useProfileStore } from "@store/profileStore";
import { ProfileSection } from "@type/profileSections";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";

const CompleteProfileScreen = () => {
  const router = useRouter();
  const { totalFields, completedFields, getSectionProgress, profile } =
    useProfileStore();

  console.log("profile data here: ", totalFields, completedFields);

  const handleSectionPress = (item: ProfileSection) => {
    if (item.screen) {
      console.log("item pressed: ", item.screen);
      router.push(`/complete-profile/${item.screen}`);
    } else {
      console.log(`Pressed: ${item.sectionName}`);
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
                isCompleted={completed === total}
                fieldsCount={total}
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
