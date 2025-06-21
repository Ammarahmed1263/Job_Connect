import React, { FC } from "react";
import { width } from "@constants/metrics";
import Svg, { G, Path } from "react-native-svg";
import Animated, {
  SharedValue,
  useAnimatedProps,
} from "react-native-reanimated";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface AnimatedTabBackgroundProps {
  activeTabIndex: SharedValue<number>;
  curveY: SharedValue<number>;
  tabWidth: number;
  curveOffset: number;
  controlOffset: number;
  borderRadius: number;
  fill: string;
  barHeight: number;
}

export const AnimatedTabBackground: FC<AnimatedTabBackgroundProps> = ({
  activeTabIndex,
  curveY,
  tabWidth,
  curveOffset,
  controlOffset,
  borderRadius,
  barHeight,
  fill,
}) => {
  const pathAnimatedProps = useAnimatedProps(() => {
    const baseX = activeTabIndex.value * tabWidth + tabWidth / 2;
    return {
      d: `
        M0 ${borderRadius}
        Q0 0 ${borderRadius} 0
        H${baseX - curveOffset}
        C${baseX - controlOffset} 0, 
          ${baseX - controlOffset} ${curveY.value}, 
          ${baseX} ${curveY.value}
        C${baseX + controlOffset} ${curveY.value}, 
          ${baseX + controlOffset} 0, 
          ${baseX + curveOffset} 0
        H${width - borderRadius}
        Q${width} 0 ${width} ${borderRadius}
        V${barHeight}
        H0
        Z
      `,
    };
  });

  return (
    <Svg
      width={width + 1}
      height={barHeight}
      style={{ 
        position: "absolute", 
        left: 0, 
        right: 0, 
        bottom: 0,
      }}
    >
      <AnimatedPath 
        fill={fill} 
        animatedProps={pathAnimatedProps} 
      />
    </Svg>
  );
};
