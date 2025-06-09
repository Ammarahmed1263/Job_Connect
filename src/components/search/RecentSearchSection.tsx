import { AppText, AppButton } from "@components/ui";
import { useSearchStore } from "@store/searchStore";
import { View } from "react-native";
import SearchHistoryItem from "./SearchHistoryItem";

const RecentSearchSection = ({ onItemPress }: { onItemPress: (q: string) => void }) => {
  const { searchHistory, clearSearchHistory } = useSearchStore();

  if (searchHistory.length === 0) return null;

  return (
    <View className="mb-8">
      <View className="flex-row justify-between items-center">
        <AppText variant="semiBold">Recent Search</AppText>
        <AppButton
          title="Clear"
          onPress={clearSearchHistory}
          textClassName="!text-[--accent-color]"
          flat
        />
      </View>

      <View className="mt-4 gap-3">
        {searchHistory.map((item, index) => (
          <SearchHistoryItem
            key={item + index}
            item={item}
            index={index}
            onPress={onItemPress}
          />
        ))}
      </View>
    </View>
  );
};

export default RecentSearchSection;