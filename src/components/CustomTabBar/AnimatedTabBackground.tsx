import React, { FC } from "react";
import { width } from "@constants/metrics";
import Svg, { G, Path } from "react-native-svg";
import Animated, { SharedValue, useAnimatedProps } from "react-native-reanimated";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface AnimatedTabBackgroundProps {
  activeTabIndex: SharedValue<number>;
  curveY: SharedValue<number>;
  tabWidth: number;
  controlPointY: number;
  curveOffset: number;
  controlOffset: number;
  fill: string;
  offsetX: number;
}

export const AnimatedTabBackground: FC<AnimatedTabBackgroundProps> = ({
  activeTabIndex,
  curveY,
  tabWidth,
  controlPointY,
  curveOffset,
  controlOffset,
  fill,
  offsetX,
}: any) => {
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
    <Svg width={width} height={70} style={{ position: "absolute", top: 0 }}>
      <G transform={`translate(${offsetX}, 0)`}>
        <AnimatedPath
          fill={fill}
          animatedProps={pathAnimatedProps}
        />
      </G>
    </Svg>
  );
};