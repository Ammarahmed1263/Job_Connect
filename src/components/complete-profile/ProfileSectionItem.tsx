import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { AppIcon, AppText } from '@components/ui';
import { useTheme } from '@contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons'; // Or your preferred icon library

export interface ProfileSection {
  id: string;
  title: string;
  iconName: React.ComponentProps<typeof AppIcon>['name']; // Assuming AppIcon uses names from a specific set
  isCompleted: boolean;
  screen?: string; // Optional: for navigation
}

interface ProfileSectionItemProps {
  item: ProfileSection;
  onPress: () => void;
}

const ProfileSectionItem: React.FC<ProfileSectionItemProps> = ({ item, onPress }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center bg-[--card-color] p-4 rounded-xl mb-3 mx-4 shadow-sm active:opacity-80"
    >
      <View 
        className="w-10 h-10 rounded-full items-center justify-center mr-4"
        style={{ backgroundColor: colors['--accent-color'] }} // A lighter shade of accent
      >
        <AppIcon name={item.iconName} size={20} color={colors['--accent-color']} />
      </View>
      <AppText className="flex-1 text-[--text-primary] text-base font-medium">
        {item.title}
      </AppText>
      {item.isCompleted ? (
        <View 
          className="w-6 h-6 rounded-full items-center justify-center"
          style={{ backgroundColor: colors['--accent-color'] }}
        >
          <Ionicons name="checkmark" size={16} color={colors['--text-muted']} />
        </View>
      ) : (
        <Ionicons name="chevron-forward" size={24} color={colors['--text-secondary']} />
      )}
    </TouchableOpacity>
  );
};

export default ProfileSectionItem;