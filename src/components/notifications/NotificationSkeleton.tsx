import { ms, vs } from "@constants/metrics";
import { useTheme } from "@contexts/ThemeContext";
import React from "react";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

interface NotificationSkeletonProps {
  sectionCount?: number;
  itemsPerSection?: number;
}

const NotificationSkeleton: React.FC<NotificationSkeletonProps> = ({
  sectionCount = 2,
  itemsPerSection = 3,
}) => {
  const { colors } = useTheme();

  const renderNotificationItem = () => (
    <View style={{ flexDirection: "row", padding: ms(16), alignItems: "center" }}>
      {/* Icon Circle */}
      <View
        style={{
          width: ms(48),
          height: ms(48),
          borderRadius: ms(24),
          marginRight: ms(16),
        }}
      />

      {/* Content */}
      <View style={{ flex: 1 }}>
        {/* Title */}
        <View
          style={{
            width: "70%",
            height: vs(16),
            borderRadius: ms(4),
            marginBottom: vs(8),
          }}
        />

        {/* Message */}
        <View
          style={{
            width: "90%",
            height: vs(14),
            borderRadius: ms(4),
          }}
        />
      </View>

      {/* Time */}
      <View
        style={{
          width: ms(40),
          height: vs(12),
          borderRadius: ms(4),
          alignSelf: "flex-start",
        }}
      />
    </View>
  );

  const renderSection = (index: number) => (
    <View key={`section-${index}`} style={{ marginTop: vs(16) }}>
      {/* Section Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: ms(16),
          paddingBottom: vs(8),
        }}
      >
        {/* Section Title */}
        <View
          style={{
            width: ms(100),
            height: vs(18),
            borderRadius: ms(4),
          }}
        />

        {/* Mark all as read */}
        <View
          style={{
            width: ms(120),
            height: vs(16),
            borderRadius: ms(4),
          }}
        />
      </View>

      {/* Notification Items */}
      {Array.from({ length: itemsPerSection }).map((_, itemIndex) => (
        <View key={`item-${index}-${itemIndex}`}>{renderNotificationItem()}</View>
      ))}
    </View>
  );

  return (
    <SkeletonPlaceholder
      borderRadius={ms(4)}
      backgroundColor={colors["--text-muted"]}
      highlightColor={colors["--accent-color"]}
    >
      <View style={{ paddingVertical: vs(16) }}>
        {Array.from({ length: sectionCount }).map((_, index) =>
          renderSection(index)
        )}
      </View>
    </SkeletonPlaceholder>
  );
};

export default NotificationSkeleton;