import React, { FC } from "react";
import { width } from "@constants/metrics";
import Svg, { G, Path } from "react-native-svg";
import Animated, { SharedValue, useAnimatedProps } from "react-native-reanimated";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface AnimatedTabBackgroundProps {
  activeTabIndex: SharedValue<number>;
  curveY: SharedValue<number>;
  tabWidth: number;
  curveOffset: number;
  controlOffset: number;
  fill: string;
  barHeight: number;
}

export const AnimatedTabBackground: FC<AnimatedTabBackgroundProps> = ({
  activeTabIndex,
  curveY,
  tabWidth,
  curveOffset,
  controlOffset,
  barHeight,
  fill,
}) => {
  const pathAnimatedProps = useAnimatedProps(() => {
    const baseX = activeTabIndex.value * tabWidth + tabWidth / 2;
    return {
      d: `
        M0 0 
        H${baseX - curveOffset} 
        C${baseX - controlOffset} 0, 
          ${baseX - controlOffset} ${curveY.value}, 
          ${baseX} ${curveY.value} 
        C${baseX + controlOffset} ${curveY.value}, 
          ${baseX + controlOffset} 0, 
          ${baseX + curveOffset} 0 
        H${width} 
      `,
    };
  });

  return (
    <Svg width={width} height={barHeight} style={{ position: "absolute", top: 0}}>
        <AnimatedPath
          fill={fill}
          animatedProps={pathAnimatedProps}
        />
    </Svg>
  );
};