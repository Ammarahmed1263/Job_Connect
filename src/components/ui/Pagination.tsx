import { useTheme } from "@contexts/ThemeContext";
import { vs, hs } from "@constants/metrics";
import React, { FC } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

export interface PaginationProps extends TouchableOpacityProps {
  dotsLength: number;
  scrollProgress: SharedValue<number>;
  activeDotIndex: number;
  inactiveDotOpacity?: number;
  inactiveDotScale?: number;
  dotStyle?: StyleProp<ViewStyle>;
  activeDotStyle?: StyleProp<ViewStyle>;
  inactiveDotStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  setActiveIndex: (index: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  dotsLength,
  scrollProgress,
  activeDotIndex,
  inactiveDotOpacity = 0.7,
  inactiveDotScale = 0.3,
  dotStyle,
  activeDotStyle,
  inactiveDotStyle,
  containerStyle,
  setActiveIndex,
  ...props
}) => {
  const { colors } = useTheme();
  const dotWidth = ((dotStyle as ViewStyle)?.width ?? 30) as number;

  return (
    <Animated.View style={[styles.paginationContainer, containerStyle]}>
      {Array.from({ length: dotsLength }, (_, index) => {
        const animatedStyle = useAnimatedStyle(() => {
          const width = interpolate(
            scrollProgress.value,
            [index - 1, index, index + 1],
            [
              dotWidth * inactiveDotScale,
              dotWidth,
              dotWidth * inactiveDotScale,
            ],
            Extrapolation.CLAMP
          );

          const opacity = interpolate(
            scrollProgress.value,
            [index - 1, index, index + 1],
            [inactiveDotOpacity, 1, inactiveDotOpacity],
            Extrapolation.CLAMP
          );

          const backgroundColor = interpolateColor(
            scrollProgress.value,
            [index - 1, index, index + 1],
            [
              colors['--text-muted'],
              colors['--accent-color'],
              colors['--text-muted'],
            ]
          );

          return {
            width,
            backgroundColor,
            opacity,
          };
        });

        return (
          <TouchableOpacity
            key={index}
            disabled={activeDotIndex === index}
            hitSlop={10}
            onPress={() => setActiveIndex(index)}
            {...props}
          >
            <Animated.View
              style={[
                {
                  height: vs(8),
                  borderRadius: hs(4),
                },
                dotStyle,
                animatedStyle,
              ]}
            />
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: vs(20),
    gap: hs(8),
  },
});

export default Pagination;
