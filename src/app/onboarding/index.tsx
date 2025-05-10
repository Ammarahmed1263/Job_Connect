import OnboardingSlide from "@components/onboarding/OnboardingSlide";
import { AppButton } from "@components/ui";
import Pagination from "@components/ui/Pagination";
import { hs, vs, width } from "@constants/metrics";
import { ONBOARDING_SLIDES } from "@constants/onboardingSlides";
import { useSafeArea } from "@hooks/useSafeArea";
import useAuthStore from "@store/authStore";
import clsx from "clsx";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  runOnJS,
} from "react-native-reanimated";

const OnboardingScreen = () => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollProgress = useSharedValue(0);
  const router = useRouter();
  const { top } = useSafeArea();
  const {setOnboarding} = useAuthStore();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollProgress.value = event.contentOffset.x / width;
    },
    onMomentumEnd: (event) => {
      const index = Math.round(event.contentOffset.x / width);
      runOnJS(setCurrentIndex)(index);
    },
  });

  const handleDotPress = (index: number) => {
    setCurrentIndex(index);
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const handleNext = () => {
    if (currentIndex < ONBOARDING_SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      setOnboarding(true);
      router.replace("/home");
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      flatListRef.current?.scrollToIndex({ index: currentIndex - 1 });
    }
  };

  return (
    <View className="flex-1 bg-[--bg-color] justify-center" style={{ paddingTop: top }}>
      <Animated.FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={ONBOARDING_SLIDES}
        renderItem={({ item }) => <OnboardingSlide item={item} />}
        keyExtractor={(item) => item.key}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        style={{flexGrow: 0}}
      />

      <Pagination
        scrollProgress={scrollProgress}
        dotsLength={ONBOARDING_SLIDES.length}
        activeDotIndex={currentIndex}
        inactiveDotScale={0.23}
        setActiveIndex={handleDotPress}
        dotStyle={styles.paginationDot}
      />

      {/* Button */}
      <View className="flex-row justify-between gap-4 my-4">
        {currentIndex > 0 && (
          <AppButton
            title="back"
            onPress={handlePrev}
            // className="bg-[--primary-500] dark:bg-[--primary-200]"
            wrapperClassName="flex-1 ms-4"
          />
        )}
        <AppButton
          title={
            currentIndex === ONBOARDING_SLIDES.length - 1
              ? "Get Started"
              : "Next"
          }
          onPress={handleNext}
          // className="bg-[--primary-500] dark:bg-[--primary-200]"
          wrapperClassName={clsx("flex-1 ", currentIndex === 0 ? 'mx-4' : 'me-4')}
        />
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  paginationDot: {
    width: hs(40),
    height: vs(8),
  },
});
