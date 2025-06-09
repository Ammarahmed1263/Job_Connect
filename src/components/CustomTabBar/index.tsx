import { width } from "@constants/metrics";
import {
  ANIMATION_DURATION,
  INDICATOR_OFFSET,
  INDICATOR_Y_OFFSET,
  PATH_CONTROL_POINT_OFFSET,
  PATH_CONTROL_POINT_Y,
  PATH_CURVE_OFFSET,
  WHOLE_DEPTH,
} from "@constants/tabBar";
import { useTheme } from "@contexts/ThemeContext";
import { useSafeArea } from "@hooks/useSafeArea";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { useCallback, useEffect, useState } from "react";
import { BackHandler, LayoutChangeEvent, View } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { AnimatedIndicator } from "./AnimatedIndicator";
import { AnimatedTabBackground } from "./AnimatedTabBackground";
import { TabButton } from "./TabButton";

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { colors } = useTheme();
  const numTabs = state.routes.length;
  const tabWidth = width / numTabs;
  const activeTabIndex = useSharedValue(state.index);
  const curveY = useSharedValue(PATH_CONTROL_POINT_Y);
  const indicatorPosition = useSharedValue(
    state.index * tabWidth + tabWidth / 2
  );
  const indicatorY = useSharedValue(WHOLE_DEPTH);
  const [tabHeight, setTabHeight] = useState<number>(0);
  const { bottom } = useSafeArea();

  const indicatorAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: indicatorPosition.value - INDICATOR_OFFSET },
      { translateY: indicatorY.value },
    ],
  }));

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setTabHeight(height);
  }, []);

  const animateTab = useCallback((index: number) => {
    curveY.value = withTiming(0, { duration: ANIMATION_DURATION / 2 }, () => {
      activeTabIndex.value = index;
      curveY.value = withSpring(PATH_CONTROL_POINT_Y, {
        damping: 10,
        stiffness: 200,
      });
    });

    indicatorPosition.value = withTiming(index * tabWidth + tabWidth / 2, {
      duration: ANIMATION_DURATION,
    });

    indicatorY.value = withTiming(
      INDICATOR_Y_OFFSET,
      { duration: ANIMATION_DURATION / 2 },
      () => {
        indicatorY.value = withSpring(WHOLE_DEPTH, {
          damping: 10,
          stiffness: 200,
        });
      }
    );
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        animateTab(state.index);
        return false;
      }
    );

    return () => backHandler.remove();
  }, [animateTab, state.index]);

  const handleTabPress = useCallback(
    (index: number) => () => {
      animateTab(index);

      const event = navigation.emit({
        type: "tabPress",
        target: state.routes[index].key,
        canPreventDefault: true,
      });

      if (!event.defaultPrevented) {
        navigation.navigate(state.routes[index].name);
      }
    },
    [navigation, state.routes, animateTab]
  );

  return (
    <View
      className="w-full bg-[--card-color] flex-row rounded-t-3xl py-4"
      style={{ bottom }}
      onLayout={handleLayout}
    >
      <AnimatedTabBackground
        activeTabIndex={activeTabIndex}
        curveY={curveY}
        tabWidth={tabWidth}
        curveOffset={PATH_CURVE_OFFSET}
        controlOffset={PATH_CONTROL_POINT_OFFSET}
        fill={colors["--bg-color"]}
        barHeight={tabHeight}
      />

      <AnimatedIndicator animatedStyle={indicatorAnimatedStyle} />

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const icon = options.tabBarIcon
          ? options.tabBarIcon({
              focused: isFocused,
              color: isFocused
                ? colors["--accent-color"]
                : colors["--text-muted"],
              size: 28,
            })
          : null;

        const iconStyle = useAnimatedStyle(() => ({
          transform: [
            {
              translateY: withSpring(
                isFocused ? WHOLE_DEPTH - 5 : WHOLE_DEPTH,
                {
                  damping: 5,
                  stiffness: 200,
                }
              ),
            },
          ],
        }));

        return (
          <TabButton
            key={route.key}
            label={
              typeof options.title === "string" ? options.title : route.name
            }
            isFocused={isFocused}
            onPress={handleTabPress(index)}
            icon={icon}
            iconStyle={iconStyle}
            colorFocused="color-[--accent-color]"
            colorUnfocused="color-[--text-muted]"
          />
        );
      })}
    </View>
  );
};

export default CustomTabBar;
