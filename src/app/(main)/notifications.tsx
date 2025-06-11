import {
  NotificationItem,
  NotificationSection,
} from "@components/notifications";
import { AppIcon, AppText, NavigationHeader } from "@components/ui";
import initialNotifications from "@constants/mockNotifications";
import { useTheme } from "@contexts/ThemeContext";
import { useSafeArea } from "@hooks/useSafeArea";
import { Notification, NotificationCategory } from "@type/notificationTypes";
import React, { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";

const getNotificationCategory = (dateString: string): NotificationCategory => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);

  today.setHours(0, 0, 0, 0);
  yesterday.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0); // Normalize notification date as well

  if (date.getTime() === today.getTime()) {
    return "Today";
  }
  if (date.getTime() === yesterday.getTime()) {
    return "Yesterday";
  }
  if (date > oneWeekAgo) {
    return "This Week";
  }
  return "Earlier";
};

const Notifications = () => {
  const { colors } = useTheme();
  const { top, bottom, left, right } = useSafeArea();
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const categorizedNotifications = useMemo(() => {
    return notifications.reduce((acc, notification) => {
      const category = getNotificationCategory(notification.createdAt);
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(notification);
      return acc;
    }, {} as Record<NotificationCategory, Notification[]>);
  }, [notifications]);

  const handleMarkAllAsRead = (category: NotificationCategory) => {
    setNotifications((prev) =>
      prev.map((n) =>
        getNotificationCategory(n.createdAt) === category
          ? { ...n, read: true }
          : n
      )
    );
  };

  const handleMarkOneAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    // Potentially navigate or perform other actions here
  };

  const notificationSections: NotificationCategory[] = [
    "Today",
    "Yesterday",
    "This Week",
    "Earlier",
  ];

  return (
    <View className="flex-1">
      <NavigationHeader title="Notifications">
        {unreadCount > 0 ? (
          <View className="!bg-[--primary-50] px-2 py-1 rounded-md">
            <AppText className="text-white">{unreadCount} NEW</AppText>
          </View>
        ) : null}
      </NavigationHeader>

      <ScrollView className="bg-[--bg-color]" showsVerticalScrollIndicator={false}>
        {notificationSections.map((sectionTitle) => {
          const sectionNotifications = categorizedNotifications[sectionTitle];
          if (!sectionNotifications || sectionNotifications.length === 0) {
            return null;
          }
          return (
            <NotificationSection
              key={sectionTitle}
              title={sectionTitle.toUpperCase()}
              onMarkAllAsRead={() => handleMarkAllAsRead(sectionTitle)}
            >
              {sectionNotifications.map((item) => (
                <NotificationItem
                  key={item.id}
                  {...item}
                  onPress={() => handleMarkOneAsRead(item.id)}
                />
              ))}
            </NotificationSection>
          );
        })}

        {notifications.length === 0 && (
          <View className="flex-1 items-center justify-center py-10">
            <AppIcon
              name="bell-outline"
              size={60}
              color={colors["--text-muted"]}
            />
            <AppText className="text-lg text-[--text-muted] mt-4">
              No notifications yet.
            </AppText>
            <AppText className="text-[--text-muted]">
              Check back later for updates.
            </AppText>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Notifications;
