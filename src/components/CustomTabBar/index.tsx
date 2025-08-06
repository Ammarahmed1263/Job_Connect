import { ms, vs, width } from "@constants/metrics";
import {
  ANIMATION_DURATION,
  INDICATOR_OFFSET,
  INDICATOR_Y_OFFSET,
  PATH_CONTROL_POINT_OFFSET,
  PATH_CONTROL_POINT_Y,
  PATH_CURVE_OFFSET,
  TAB_BORDER_RADIUS,
  TAB_HEIGHT,
  WHOLE_DEPTH,
} from "@constants/tabBar";
import { useTheme } from "@contexts/ThemeContext";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { useCallback, useEffect, useMemo } from "react";
import { BackHandler, StyleSheet, View } from "react-native";
import {
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { AnimatedIndicator } from "./AnimatedIndicator";
import { AnimatedTabBackground } from "./AnimatedTabBackground";
import {MemoizedTabButton as TabButton} from "./TabButton";

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { colors } = useTheme();
  const numTabs = state.routes.length;
  const tabWidth = useMemo(() => width / numTabs, [numTabs]);
  const activeTabIndex = useSharedValue(state.index);
  const curveY = useSharedValue(PATH_CONTROL_POINT_Y);
  const indicatorPosition = useSharedValue(
    state.index * tabWidth + tabWidth / 2
  );
  const indicatorY = useSharedValue(WHOLE_DEPTH);

  const indicatorAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: indicatorPosition.value - INDICATOR_OFFSET },
      { translateY: indicatorY.value },
    ],
  }));


  const animateTab = useCallback((index: number) => {
    'worklet';
    // Batch animations together
    const animations = {
      curveY: withSequence(
        withTiming(0, { duration: ANIMATION_DURATION / 2 }),
        withSpring(PATH_CONTROL_POINT_Y, { damping: 10, stiffness: 200 })
      ),
      indicatorPosition: withTiming(index * tabWidth + tabWidth / 2, {
        duration: ANIMATION_DURATION,
      }),
      indicatorY: withSequence(
        withTiming(INDICATOR_Y_OFFSET, { duration: ANIMATION_DURATION / 2 }),
        withSpring(WHOLE_DEPTH, { damping: 10, stiffness: 200 })
      )
    };

    activeTabIndex.value = index;
    Object.entries(animations).forEach(([key, animation]) => {
      switch(key) {
        case 'curveY': curveY.value = animation; break;
        case 'indicatorPosition': indicatorPosition.value = animation; break;
        case 'indicatorY': indicatorY.value = animation; break;
      }
    });
  }, [tabWidth]);

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        runOnUI(() => {
          'worklet';
          activeTabIndex.value = state.index;
          indicatorPosition.value = state.index * tabWidth + tabWidth / 2;
          animateTab(state.index);
        })();
        return false;
      }
    );

    return () => subscription.remove();
  }, [state.index, tabWidth, animateTab]);

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
      className="w-full flex-row py-4"
      style={styles.barContainer}
    >
      <AnimatedTabBackground
        activeTabIndex={activeTabIndex}
        curveY={curveY}
        tabWidth={tabWidth}
        curveOffset={PATH_CURVE_OFFSET}
        controlOffset={PATH_CONTROL_POINT_OFFSET}
        borderRadius={ms(TAB_BORDER_RADIUS)}
        fill={colors["--card-color"]}
        barHeight={vs(TAB_HEIGHT)}
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
                isFocused ? WHOLE_DEPTH - 2 : WHOLE_DEPTH + 2,
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

const styles = StyleSheet.create({
  barContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
  }
})
