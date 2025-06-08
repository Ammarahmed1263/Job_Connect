import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { AppText } from '@components/ui';
import { useTheme } from '@contexts/ThemeContext';

interface NotificationSectionProps {
  title: string;
  onMarkAllAsRead?: () => void;
  children: React.ReactNode;
}

const NotificationSection: React.FC<NotificationSectionProps> = ({ title, onMarkAllAsRead, children }) => {
  const { colors } = useTheme();

  return (
    <View className="mt-4">
      <View className="flex-row justify-between items-center px-4 pb-2">
        <AppText variant='semiBold' className="!text-2xl uppercase !text-[--text-muted]">{title}</AppText>
        {onMarkAllAsRead && (
          <TouchableOpacity onPress={onMarkAllAsRead}>
            <AppText className="!text-[--accent-color]">Mark all as read</AppText>
          </TouchableOpacity>
        )}
      </View>
      {children}
    </View>
  );
};

export default NotificationSection;