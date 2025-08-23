import { ms, vs } from "@constants/metrics";
import { useTheme } from "@contexts/ThemeContext";
import React from "react";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const JobCardSkeleton = () => {
  const { colors } = useTheme();

  return (
    <SkeletonPlaceholder
      borderRadius={ms(12)}
      highlightColor={colors["--accent-color"]}
      backgroundColor={colors["--text-muted"]}
    >
      <View
        style={{
          padding: ms(16),
          borderRadius: ms(12),
          borderWidth: 1,
          backgroundColor: colors["--text-muted"],
          borderColor: colors["--text-muted"],
        }}
      >
        {/* Company Logo Placeholder */}
        <View
          style={{
            width: ms(48),
            height: ms(48),
            borderRadius: ms(12),
            marginBottom: vs(12),
          }}
        />

        {/* Job Title Placeholder */}
        <View
          style={{
            width: "80%",
            height: vs(16),
            borderRadius: ms(6),
            marginBottom: vs(8),
          }}
        />

        {/* Company Name Placeholder */}
        <View
          style={{
            width: "50%",
            height: vs(14),
            borderRadius: ms(6),
            marginBottom: vs(8),
          }}
        />

        {/* Location and Job Type Placeholders */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            gap: ms(12),
            marginBottom: vs(8),
          }}
        >
          <View
            style={{
              width: "30%",
              height: vs(14),
              borderRadius: ms(6),
            }}
          />
          <View
            style={{
              width: "30%",
              height: vs(14),
              borderRadius: ms(6),
            }}
          />
        </View>

        {/* Salary and Posted Date Placeholders */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            gap: ms(12),
          }}
        >
          <View
            style={{
              width: "25%",
              height: vs(14),
              borderRadius: ms(6),
            }}
          />
          <View
            style={{
              width: "25%",
              height: vs(14),
              borderRadius: ms(6),
            }}
          />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

export default JobCardSkeleton;
