import { AppIcon, AppText } from "@components/ui";
import { IconName } from "@components/ui/AppIcon";
import { useTheme } from "@contexts/ThemeContext";
import { iconMap, NotificationType } from "@type/notificationTypes";
import clsx from "clsx";
import React from "react";
import { TouchableOpacity, View } from "react-native";

interface NotificationItemProps {
  id: string;
  type: number;
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
  const iconKeys = Object.keys(iconMap) as NotificationType[];

  const iconName = iconMap[iconKeys[type]] ?? "bell-outline";

  return (
    <TouchableOpacity
      onPress={onPress}
      className={clsx(
        "flex-row items-center p-4",
        !read && "bg-[--primary-400]"
      )}
      accessibilityRole="button"
      accessibilityLabel={`Notification: ${title}`}
    >
      <View className="w-12 h-12 rounded-full bg-[--card-color] items-center justify-center mr-4">
        <AppIcon
          name={iconName as IconName}
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

      <AppText
        variant="light"
        className="text-[--text-muted] ms-2 self-start"
      >
        {time}
      </AppText>
    </TouchableOpacity>
  );
};

export default NotificationItem;
