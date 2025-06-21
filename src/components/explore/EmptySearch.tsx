import { RecentJobsSection, RecentSearchSection } from "@components/search";
import { vs } from "@constants/metrics";
import { TAB_HEIGHT } from "@constants/tabBar";
import { useSearchStore } from "@store/searchStore";
import React, { FC } from "react";
import { ScrollView } from "react-native";

interface EmptySearchProps {
  onSearchItemPress: () => void
}

const EmptySearch: FC<EmptySearchProps> = ({onSearchItemPress}) => {
  const { setSearchText, setBarState } = useSearchStore();

  const handleSearchItemPress = (query: string) => {
    setSearchText(query);
    setBarState("submitted");
    onSearchItemPress();
  };

  return (
    <ScrollView
      className="flex-1 px-4"
      contentContainerClassName="pt-6"
      contentContainerStyle={{ paddingBottom: vs(TAB_HEIGHT) }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <RecentSearchSection onItemPress={handleSearchItemPress} />
      <RecentJobsSection />
    </ScrollView>
  );
};

export default EmptySearch;
