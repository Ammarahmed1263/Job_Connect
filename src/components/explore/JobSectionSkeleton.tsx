import React from "react";
import { View } from "react-native";
import { AppText } from "@components/ui";
import { hs, ms, vs, width } from "@constants/metrics";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { useTheme } from "@contexts/ThemeContext";
import JobCardSkeleton from "@components/jobs/JobCardSkeleton";

interface JobSectionSkeletonProps {
  itemCount?: number;
}

const JobSectionSkeleton = ({ itemCount = 2 }: JobSectionSkeletonProps) => {
  const { colors } = useTheme();

  return (
    <SkeletonPlaceholder
      borderRadius={8}
      backgroundColor={colors["--text-muted"]}
      highlightColor={colors["--accent-color"]}
    >
      <View style={{ padding: vs(16), gap: vs(16) }}>
        <View className="px-4 mb-4" style={{ marginTop: vs(16) }}>
          <View
            style={{
              height: vs(24),
              width: hs(160),
              borderRadius: ms(12),
              marginBottom: vs(8),
            }}
          />
          <View
            style={{ height: vs(16), width: hs(240), borderRadius: ms(8) }}
          />
        </View>
        <View style={{ flexDirection: "row", gap: hs(12) }}>
          {Array.from({ length: itemCount }).map((_, index) => (
            <View
              key={index}
              style={{
                padding: ms(16),
                borderRadius: ms(12),
                borderWidth: 1,
                backgroundColor: colors["--text-muted"],
                borderColor: colors["--text-muted"],
                width: width * 0.8
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
          ))}
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

export default JobSectionSkeleton;
