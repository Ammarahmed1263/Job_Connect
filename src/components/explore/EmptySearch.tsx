import {RecentJobsSection, RecentSearchSection} from "@components/search";
import { useSearchStore } from "@store/searchStore";
import React from "react";
import { ScrollView } from "react-native";

export default function SearchScreen() {
  const { setSearchText, setBarState } = useSearchStore();

  const handleSearchItemPress = (query: string) => {
    setSearchText(query);
    setBarState("submitted");
  };

  return (
    <ScrollView
      className="flex-1 px-4"
      contentContainerClassName="py-6"
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <RecentSearchSection onItemPress={handleSearchItemPress} />
      <RecentJobsSection />
    </ScrollView>
  );
}
