import {
  EmptySearch,
  ExploreContent,
  ExploreHeader,
  SearchResults,
} from "@components/explore";
import { FiltersSheet } from "@components/filters/FiltersSheet";
import { AppText } from "@components/ui";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useSafeArea } from "@hooks/useSafeArea";
import useAuthStore from "@store/authStore";
import { useSearchStore } from "@store/searchStore";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { Keyboard, TextInput, View } from "react-native";

const Explore = () => {
  const router = useRouter();
  const { top, bottom } = useSafeArea();
  const { barState, setBarState, clearSearchText } = useSearchStore();
  const inputRef = useRef<TextInput>(null);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  console.log('user id here: ', user?.id)
  const filterSheetRef = useRef<BottomSheetModal>(null);

  const openFilters = () => {
    if (filterSheetRef.current) {
      filterSheetRef.current.present();
    } else {
      console.warn('Filter sheet ref is not set yet');
    }
  };


  const handleNotificationPress = () => {
    router.push("/notifications");
  };

  const handleBackButton = () => {
    setBarState("idle");
    Keyboard.dismiss();
    clearSearchText();
  };

  const blurSearchInput = () => {
    Keyboard.dismiss();
  };

  const renderScreenContent = () => {
    if (!isAuthenticated) {
      return (
        <View className="flex-1 items-center justify-center">
          <AppText>You are not authenticated</AppText>
        </View>
      );
    }

    switch (barState) {
      case "idle":
        return <ExploreContent />;
      case "focused":
        return <EmptySearch onSearchItemPress={blurSearchInput} />;
      case "submitted":
        return <SearchResults />;
    }
  };

  return (
    <View className="flex-1" style={{ marginTop: top, marginBottom: bottom }}>
      <ExploreHeader
        inputRef={inputRef}
        onBackButtonPress={handleBackButton}
        onNotificationPress={handleNotificationPress}
        onFilterPress={openFilters}
      />
      {renderScreenContent()}
      <FiltersSheet ref={filterSheetRef} />
    </View>
  );
};

export default Explore;
