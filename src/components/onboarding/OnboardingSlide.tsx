import { AppText } from "@components/ui";
import { width } from "@constants/metrics";
import { OnboardingSlideItem } from "@constants/onboardingSlides";
import React, { FC } from "react";
import { Image, View } from "react-native";

interface OnboardingSlideProps {
  item: OnboardingSlideItem;
}

const OnboardingSlide: FC<OnboardingSlideProps> = ({ item }) => {
  return (
    <View style={{ width}} className="w-full py-5">
      <Image
        source={item.image}
        className="w-full h-80"
        resizeMode="contain"
      />
      <AppText
        variant="semiBold"
        className="text-center mt-5 !text-[--primary-100]"
      >
        {item.title}
      </AppText>
      <AppText
        variant="light"
        className="text-center mt-5 color-[--text-muted]"
      >
        {item.description}
      </AppText>
    </View>
  );
};

export default OnboardingSlide;