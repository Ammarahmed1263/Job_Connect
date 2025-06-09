import React from 'react';
import { View } from 'react-native';
import { AppText } from '@components/ui';
import { useTheme } from '@contexts/ThemeContext';

interface ProfileCompletionProgressProps {
  completed: number;
  total: number;
}

const ProfileCompletionProgress: React.FC<ProfileCompletionProgressProps> = ({ completed, total }) => {
  const { colors } = useTheme();
  const progressPercentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <View className="my-4 px-4">
      <View className="flex-row justify-between items-center mb-1">
        <AppText variant="light" className="text-[--text-secondary]">Your Profile Progress</AppText>
        <AppText variant="light" className="text-[--text-primary] font-semibold">
          {completed}/{total}
        </AppText>
      </View>
      <View className="h-2 bg-[--gray-light] rounded-full overflow-hidden">
        <View
          style={{
            width: `${progressPercentage}%`,
            backgroundColor: colors['--accent-color'],
          }}
          className="h-2 rounded-full"
        />
      </View>
    </View>
  );
};

export default ProfileCompletionProgress;