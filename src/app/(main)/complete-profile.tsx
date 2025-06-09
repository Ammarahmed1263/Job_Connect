import React from 'react';
import { ScrollView, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ProfileCompletionProgress, ProfileSectionItem, ProfileSection } from '@components/complete-profile';
import { useTheme } from '@contexts/ThemeContext';
import { useSafeArea } from '@hooks/useSafeArea';
import { AppText } from '@components/ui'; // Assuming you might need it

// Mock data based on the image
// You'll replace this with actual data from your store or API
const profileSectionsData: ProfileSection[] = [
  { id: '1', title: 'Contact Info', iconName: 'person-outline', isCompleted: false, screen: '/contact-info-edit' }, // Example screen
  { id: '2', title: 'About Me', iconName: 'document-text-outline', isCompleted: true },
  { id: '3', title: 'Experience', iconName: 'briefcase-outline', isCompleted: true },
  { id: '4', title: 'Education', iconName: 'school-outline', isCompleted: true },
  { id: '5', title: 'Projects', iconName: 'stats-chart-outline', isCompleted: false },
  { id: '6', title: 'Certificates & License', iconName: 'ribbon-outline', isCompleted: false },
  { id: '7', title: 'Volunteers Experience', iconName: 'people-outline', isCompleted: false },
  { id: '8', title: 'Awards & Achievements', iconName: 'trophy-outline', isCompleted: false },
  { id: '9', title: 'Skills', iconName: 'sparkles-outline', isCompleted: false },
  { id: '10', title: 'Resume/CV', iconName: 'document-attach-outline', isCompleted: false },
];

const CompleteProfileScreen = () => {
  const { colors } = useTheme();
  const { top } = useSafeArea();
  const router = useRouter();

  const completedCount = profileSectionsData.filter(item => item.isCompleted).length;
  const totalCount = profileSectionsData.length;

  const handleSectionPress = (item: ProfileSection) => {
    if (item.screen) {
      router.push(item.screen as any); // Type assertion if paths are known to be valid
    } else {
      // Handle navigation for sections without a specific screen or if already completed
      console.log(`Pressed: ${item.title}`);
    }
  };

  return (
    <View className="flex-1 bg-[--bg-color]" style={{ paddingTop: top }}>
      <Stack.Screen options={{ title: 'Your Profile'}} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileCompletionProgress completed={completedCount} total={totalCount} />
        <View className="mt-2 mb-4">
          {profileSectionsData.map((item) => (
            <ProfileSectionItem
              key={item.id}
              item={item}
              onPress={() => handleSectionPress(item)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default CompleteProfileScreen;