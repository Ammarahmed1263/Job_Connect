import { AppButton, AppIcon, AppText } from "@components/ui";
import { useTheme } from "@contexts/ThemeContext";
import { useSearchStore } from "@store/searchStore";
import React, { FC } from "react";
import { View } from "react-native";

interface SearchHistoryItemProps {
  item: string;
  index: number;
  onPress: (item: string) => void;
}

const SearchHistoryItem: FC<SearchHistoryItemProps> = ({
  item,
  index,
  onPress,
}) => {
  const { colors } = useTheme();
  const deleteSearchItem = useSearchStore((state) => state.deleteHistoryItem);

  return (
    <AppButton
      title=""
      flat
      onPress={() => onPress(item)}
      onStartShouldSetResponder={() => true}
    >
      <View className="w-full flex-row justify-between">
        <View className="flex-row gap-4">
          <AppIcon
            name="arrow-right-up"
            size={30}
            color={colors["--text-muted"]}
          />
          <AppText
            key={item + index}
            className="rounded-md !text-[--text-muted]"
          >
            {item}
          </AppText>
        </View>
        <AppButton title="" onPress={() => deleteSearchItem(index)} flat>
          <AppIcon name="close" size={28} color={colors["--text-muted"]} />
        </AppButton>
      </View>
    </AppButton>
  );
};

export default SearchHistoryItem;
