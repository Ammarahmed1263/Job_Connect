import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@components/ui';
import { useTheme } from '@contexts/ThemeContext';

interface ProfileMenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress: () => void;
  iconColor?: string;
  showChevron?: boolean;
}

const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({
  icon,
  title,
  onPress,
  iconColor,
  showChevron = true
}) => {
  const { colors } = useTheme();
  const defaultIconColor = iconColor || colors['--accent-color'] || '#6366F1';

  return (
    <TouchableOpacity
      className="flex-row items-center px-6 py-4 bg-[--card-color] mx-4 my-1 rounded-xl shadow-sm"
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Icon */}
      <View className="w-10 h-10 rounded-full bg-[--bg-color] justify-center items-center mr-4">
        <Ionicons
          name={icon}
          size={20}
          color={defaultIconColor}
        />
      </View>

      {/* Title */}
      <View className="flex-1">
        <AppText className="color-[--text-primary] text-base">
          {title}
        </AppText>
      </View>

      {/* Chevron */}
      {showChevron && (
        <Ionicons
          name="chevron-forward"
          size={20}
          color={colors['--text-muted'] || '#9CA3AF'}
        />
      )}
    </TouchableOpacity>
  );
};

export default ProfileMenuItem;