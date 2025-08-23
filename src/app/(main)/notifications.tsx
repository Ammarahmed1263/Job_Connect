import notificationService from "@api/services/notificationService";
import {
  NotificationItem,
  NotificationSection,
  NotificationSkeleton,
} from "@components/notifications";
import { AppIcon, AppText, NavigationHeader } from "@components/ui";
import AppLoading from "@components/ui/AppLoading";
import { useTheme } from "@contexts/ThemeContext";
import { Notification, NotificationCategory } from "@type/notificationTypes";
import { getNotificationCategory } from "@utils";
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, View } from "react-native";


const Notifications = () => {
  const { colors } = useTheme();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    const loadNotifications = async () => {
      try {
        const response = await notificationService.fetchUserNotifications();
        const parsed = response.data.map((n: any) => ({
          ...n,
          read: n.isRead, // standardize key
          createdAt: n.createdAt,
          message: n.message,
        }));
        setNotifications(parsed);
      } catch (err) {
        console.error("Failed to fetch notifications", err);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, []);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const categorizedNotifications = useMemo(() => {
    return notifications.reduce((acc, notification) => {
      const category = getNotificationCategory(notification.createdAt);
      if (!acc[category]) acc[category] = [];
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
  };

  const notificationSections: NotificationCategory[] = [
    "Today",
    "Yesterday",
    "This Week",
    "Earlier",
  ];

  if(loading) {
    return <NotificationSkeleton sectionCount={3} itemsPerSection={3} />
  }

  return (
    <View className="flex-1">
      <NavigationHeader title="Notifications">
        {unreadCount > 0 && (
          <View className="!bg-[--primary-50] px-2 py-1 rounded-md">
            <AppText variant="light">{unreadCount} NEW</AppText>
          </View>
        )}
      </NavigationHeader>

      <ScrollView
        className="bg-[--bg-color]"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="grow"
      >
        {notificationSections.map((sectionTitle) => {
          const sectionNotifications = categorizedNotifications[sectionTitle];
          if (!sectionNotifications || sectionNotifications.length === 0)
            return null;

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

        {!loading && notifications.length === 0 && (
          <View className="flex-1 items-center justify-center py-10">
            <AppIcon
              name="bell-outline"
              size={120}
              color={colors["--text-muted"]}
            />
            <AppText
              variant="medium"
              className="text-center text-lg text-[--text-muted] mt-6"
            >
              No notifications yet.
            </AppText>
            <AppText
              variant="medium"
              className="text-center text-[--text-muted]"
            >
              Check back later for updates.
            </AppText>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Notifications;
