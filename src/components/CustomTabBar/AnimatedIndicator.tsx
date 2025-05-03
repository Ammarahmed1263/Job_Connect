import React from "react";
import { ViewStyle } from "react-native";
import Animated from "react-native-reanimated";

export const AnimatedIndicator = ({ animatedStyle }: { animatedStyle: ViewStyle }) => (
  <Animated.View
    style={[animatedStyle]}
    className="bg-[--accent-color] w-4 h-4 rounded-full absolute -top-2"
  />
);