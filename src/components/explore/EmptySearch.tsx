import { RecentJobsSection, RecentSearchSection } from "@components/search";
import { AppIcon, AppText } from "@components/ui";
import { vs } from "@constants/metrics";
import { TAB_HEIGHT } from "@constants/tabBar";
import { useTheme } from "@contexts/ThemeContext";
import { jobSummary } from "@type/jobTypes";
import React, { FC } from "react";
import { ScrollView, View } from "react-native";

interface EmptySearchProps {
  onSearchItemPress: () => void;
  searchHistory: string[];
  recentJobs: jobSummary[];
  setSearchText: (text: string) => void;
  setBarState: (state: 'idle' | 'focused' | 'submitted') => void;
  onClearHistory?: () => void;
  onDeleteHistoryItem: (index: number) => void;
}

const EmptySearch: FC<EmptySearchProps> = ({
  onSearchItemPress,
  searchHistory,
  recentJobs,
  setSearchText,
  setBarState,
  onClearHistory,
  onDeleteHistoryItem
}) => {
  const { colors } = useTheme();

  const handleSearchItemPress = (query: string) => {
    setSearchText(query);
    setBarState("submitted");
    onSearchItemPress();
  };

  const renderEmptyState = () => {
    return (
      <View className="flex-1 items-center justify-center px-6">
        <AppIcon name="magnifier" size={60} color={colors["--accent-color"]} />
        <AppText variant="semiBold" className="text-lg mt-4 text-center">
          No Recent Activity
        </AppText>
        <AppText className="text-center mt-2 text-[--text-secondary]">
          Start searching for jobs to see your recent searches and viewed jobs here.
        </AppText>
      </View>
    );
  };

  const hasContent = searchHistory.length > 0 || recentJobs.length > 0;

  return (
    <ScrollView
      className="flex-1 px-4"
      contentContainerClassName={`${!hasContent ? "flex-1" : "pt-6"}`}
      contentContainerStyle={{ paddingBottom: vs(TAB_HEIGHT) }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {hasContent ? (
        <>
          <RecentSearchSection 
            searchHistory={searchHistory} 
            onItemPress={handleSearchItemPress}
            onClearHistory={onClearHistory}
            onDeleteItem={onDeleteHistoryItem}
          />
          <RecentJobsSection recentJobs={recentJobs} />
        </>
      ) : renderEmptyState()}
    </ScrollView>
  );
};

export default EmptySearch;
