import {
  EmptySearch,
  ExploreContent,
  ExploreHeader,
  SearchResults,
} from "@components/explore";
import { AppText } from "@components/ui";
import { useSafeArea } from "@hooks/useSafeArea";
import useAuthStore from "@store/authStore";
import { useSearchStore } from "@store/searchStore";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { TextInput, View } from "react-native";

const Explore = () => {
  const router = useRouter();
  const { top, bottom } = useSafeArea();
  const {
    barState,
    setBarState,
    clearSearchText,
  } = useSearchStore();
  const inputRef = useRef<TextInput>(null);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleNotificationPress = () => {
    router.push("/notifications");
  };

  const handleBackButton = () => {
    clearSearchText();
    setBarState("idle");
    inputRef.current?.blur();
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
        return <EmptySearch />;
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
      />
      {renderScreenContent()}
    </View>
  );
};

export default Explore;
