import OnboardingSlide from "@components/onboarding/OnboardingSlide";
import { AppButton, AppIcon, Pagination } from "@components/ui";
import { hs, vs, width } from "@constants/metrics";
import { ONBOARDING_SLIDES } from "@constants/onboardingSlides";
import { useTheme } from "@contexts/ThemeContext";
import { useSafeArea } from "@hooks/useSafeArea";
import { useOnboardingStore } from "@store/onboardingStore";
import clsx from "clsx";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

const OnboardingScreen = () => {
  const flatListRef = useRef<FlatList>(null);
  const { currentSlide, nextSlide, prevSlide, setSlide, completeOnboarding } =
    useOnboardingStore();
  const scrollProgress = useSharedValue(0);
  const router = useRouter();
  const { top } = useSafeArea();
  const { colors } = useTheme();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollProgress.value = event.contentOffset.x / width;
    },
    onMomentumEnd: (event) => {
      const index = Math.round(event.contentOffset.x / width);
      runOnJS(setSlide)(index);
    },
  });

  const handleDotPress = (index: number) => {
    setSlide(index);
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const handleNext = () => {
    if (currentSlide < ONBOARDING_SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentSlide + 1 });
      nextSlide();
    } else {
      completeOnboarding();
      router.replace("/explore");
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      flatListRef.current?.scrollToIndex({ index: currentSlide - 1 });
      prevSlide();
    }
  };

  return (
    <>
      {/* <StatusBar backgroundColor={colors["--bg-color"]} /> */}
      <View
        className="flex-1 bg-[--bg-color] justify-center"
        style={{ paddingTop: top }}
      >
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
          style={{ flexGrow: 0 }}
        />

        {/* Button */}
        <View className="flex-row justify-between items-center gap-4 m-4">
          <AppButton
            title={""}
            onPress={handlePrev}
            wrapperClassName="!rounded-full ms-4 justify-center items-center w-16 h-16 bg-transparent border border-[--primary-100]"
            className="w-full h-full"
            wrapperStyle={{
              opacity: currentSlide > 0 ? 1 : 0,
              elevation: 0,
            }}
            disabled={currentSlide === 0}
            pointerEvents={currentSlide === 0 ? "none" : "auto"}
          >
            <AppIcon
              name="arrow-left"
              size={30}
              color={colors["--primary-100"]}
            />
          </AppButton>
          <Pagination
            scrollProgress={scrollProgress}
            dotsLength={ONBOARDING_SLIDES.length}
            activeDotIndex={currentSlide}
            inactiveDotScale={0.7}
            setActiveIndex={handleDotPress}
            dotStyle={styles.paginationDot}
            containerStyle={styles.paginationContainer}
          />
          <AppButton
            title={""}
            onPress={handleNext}
            wrapperClassName={clsx(
              "!rounded-full ms-4 justify-center items-center w-16 h-16"
            )}
            className="w-full h-full"
          >
            <AppIcon name="arrow-right" size={30} color="white" />
          </AppButton>
        </View>
      </View>
    </>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  paginationDot: {
    width: hs(18),
    height: vs(18),
    borderRadius: hs(9),
  },
  paginationContainer: {
    gap: hs(10),
  },
});
