import { SearchBar } from "@components/search";
import { AppButton, AppIcon } from "@components/ui";
import { useTheme } from "@contexts/ThemeContext";
import { useSearchStore } from "@store/searchStore";
import React, { FC, RefObject } from "react";
import { TextInput, View } from "react-native";

interface ExploreHeaderProps {
  onBackButtonPress?: () => void;
  onNotificationPress?: () => void;
  onFilterPress?: () => void;
  inputRef: RefObject<TextInput>;
}

const ExploreHeader: FC<ExploreHeaderProps> = ({
  inputRef,
  onBackButtonPress,
  onNotificationPress,
  onFilterPress,
}) => {
  const barState = useSearchStore((state) => state.barState);
  const { colors } = useTheme();

  return (
    <View className="w-full flex-row px-4 mt-6 pb-2 gap-2 justify-center items-center">
      {barState !== "idle" && (
        <AppButton
          title=""
          onPress={onBackButtonPress}
          flat
          className="flex-1 border-2 border-[--border-color] p-2 rounded-xl"
        >
          <AppIcon
            name="arrow-left"
            size={30}
            color={colors["--accent-color"]}
          />
        </AppButton>
      )}
      <SearchBar ref={inputRef} placeholder="Find your next dream job" />
      {barState === "idle" && (
        <AppButton
          title=""
          flat
          className="flex-1 border-2 border-[--accent-color] p-2 rounded-xl"
          onPress={onNotificationPress}
        >
          <AppIcon name="bell" color={colors["--accent-color"]} size={30} />
          <View className="absolute end-3 top-2 w-3 h-3 rounded-full bg-[--error-color]" />
        </AppButton>
      )}
      {barState === "submitted" && (
        <AppButton
          title=""
          flat
          className="flex-1 border-2 border-[--accent-color] p-2 rounded-xl"
          onPress={onNotificationPress}
        >
          <AppIcon name="filter" color={colors["--accent-color"]} size={30} />
        </AppButton>
      )}
    </View>
  );
};

export default ExploreHeader;
