import { hs } from "@constants/metrics";
import React from "react";
import { ViewStyle } from "react-native";
import Animated from "react-native-reanimated";

export const AnimatedIndicator = ({ animatedStyle }: { animatedStyle: ViewStyle }) => (
  <Animated.View
    style={[{width: hs(14), aspectRatio: 1}, animatedStyle]}
    className="bg-[--accent-color] rounded-full absolute -top-2"
  />
);