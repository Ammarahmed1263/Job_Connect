import { AppIcon, AppText } from "@components/ui";
import { useTheme } from "@contexts/ThemeContext";
import { iconMap, NotificationType } from "@type/notificationTypes";
import clsx from "clsx";
import React from "react";
import { TouchableOpacity, View } from "react-native";

interface NotificationItemProps {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read?: boolean;
  onPress?: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  id,
  type,
  title,
  message,
  time,
  read = false,
  onPress,
}) => {
  const { colors } = useTheme();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      // Default navigation or action based on type
      // router.push(`/notification-detail/${id}`);
      console.log(`Notification ${id} pressed`);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={clsx(
        "flex-row items-center p-4",
        !read ? "bg-[--primary-400]" : ""
      )}
    >
      <View className="w-12 h-12 rounded-full bg-[--card-color] items-center justify-center mr-4">
        <AppIcon
          name={iconMap[type]}
          size={24}
          color={colors["--accent-color"]}
        />
      </View>
      <View className="flex-1">
        <AppText variant="bold" className="!text-xl text-[--text-primary]">
          {title}
        </AppText>
        <AppText
          variant="light"
          className="!text-base text-[--text-muted]"
          numberOfLines={2}
        >
          {message}
        </AppText>
      </View>
      <AppText variant="light" className="text-[--text-muted] ms-2 self-start">
        {time}
      </AppText>
    </TouchableOpacity>
  );
};

export default NotificationItem;
