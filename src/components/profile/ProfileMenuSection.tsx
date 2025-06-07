import React from 'react';
import { View } from 'react-native';
import ProfileMenuItem from './ProfileMenuItem';
import { Ionicons } from '@expo/vector-icons';

interface MenuItem {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress: () => void;
  iconColor?: string;
}

interface ProfileMenuSectionProps {
  items: MenuItem[];
}

const ProfileMenuSection: React.FC<ProfileMenuSectionProps> = ({ items }) => {
  return (
    <View className="mt-4">
      {items.map((item) => (
        <ProfileMenuItem
          key={item.id}
          icon={item.icon}
          title={item.title}
          onPress={item.onPress}
          iconColor={item.iconColor}
        />
      ))}
    </View>
  );
};

export default ProfileMenuSection;