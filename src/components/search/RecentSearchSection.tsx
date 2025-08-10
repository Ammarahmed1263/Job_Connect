import { AppText, AppButton } from "@components/ui";
import { View } from "react-native";
import SearchHistoryItem from "./SearchHistoryItem";

interface RecentSearchSectionProps {
  searchHistory: string[];
  onItemPress: (q: string) => void;
  onClearHistory?: () => void;
  onDeleteItem: (index: number) => void;
}

const RecentSearchSection = ({ 
  searchHistory, 
  onItemPress,
  onClearHistory,
  onDeleteItem
}: RecentSearchSectionProps) => {

  if (searchHistory.length === 0) return null;

  return (
    <View className="mb-8">
      <View className="flex-row justify-between items-center">
        <AppText variant="semiBold">Recent Search</AppText>
        <AppButton
          title="Clear"
          onPress={onClearHistory}
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
            onDelete={onDeleteItem}
          />
        ))}
      </View>
    </View>
  );
};

export default RecentSearchSection;