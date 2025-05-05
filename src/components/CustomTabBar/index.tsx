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
import React, { useCallback } from "react";
import { View } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { AnimatedIndicator } from "./AnimatedIndicator";
import { AnimatedTabBackground } from "./AnimatedTabBackground";
import { TabButton } from "./TabButton";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

// const state.routes = [
//   { name: "index", label: "Home", icon: "home-outline" },
//   { name: "explore", label: "Search", icon: "search-outline" },
//   { name: "saved", label: "Likes", icon: "heart-outline" },
//   { name: "profile", label: "Profile", icon: "person-outline" },
// ];

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { colors } = useTheme();
  const tabWidth = width / state.routes.length;
  const activeTabIndex = useSharedValue(state.index);
  const curveY = useSharedValue(PATH_CONTROL_POINT_Y);
  const indicatorPosition = useSharedValue(
    state.index * tabWidth + tabWidth / 2
  );
  const indicatorY = useSharedValue(WHOLE_DEPTH);
  const { bottom } = useSafeArea();

  const offsetX = tabWidth * Math.floor(state.routes.length / 2) - width / 2;

  const indicatorAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: indicatorPosition.value - INDICATOR_OFFSET },
      { translateY: indicatorY.value },
    ],
  }));

  const handleTabPress = useCallback(
    (index: number) => () => {
      // if (index === activeTabIndex.value) return;

      curveY.value = withTiming(0, { duration: ANIMATION_DURATION / 2 }, () => {
        activeTabIndex.value = index;
        curveY.value = withTiming(PATH_CONTROL_POINT_Y, {
          duration: ANIMATION_DURATION / 2,
        });
      });

      indicatorPosition.value = withTiming(index * tabWidth + tabWidth / 2, {
        duration: ANIMATION_DURATION,
      });

      indicatorY.value = withTiming(
        INDICATOR_Y_OFFSET,
        { duration: ANIMATION_DURATION / 2 },
        () => {
          indicatorY.value = withTiming(WHOLE_DEPTH, {
            duration: ANIMATION_DURATION / 2,
          });
        }
      );

      const event = navigation.emit({
        type: "tabPress",
        target: state.routes[index].key,
        canPreventDefault: true,
      });

      if (!event.defaultPrevented) {
        navigation.navigate(state.routes[index].name);
      }
    },
    [navigation, state.index]
  );

  return (
    <View
      className="w-full bg-[--card-color] flex-row absolute rounded-tl-3xl rounded-tr-3xl py-4"
      style={{ bottom }}
    >
      <AnimatedTabBackground
        activeTabIndex={activeTabIndex}
        curveY={curveY}
        tabWidth={tabWidth}
        controlPointY={PATH_CONTROL_POINT_Y}
        curveOffset={PATH_CURVE_OFFSET}
        controlOffset={PATH_CONTROL_POINT_OFFSET}
        fill={colors["--bg-color"]}
        offsetX={offsetX}
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
                  stiffness: 150,
                }
              ),
            },
          ],
        }));

        return (
          <TabButton
            key={route.key}
            label={
              typeof options.title === "string"
                ? options.title
                : route.name
            }
            index={index}
            isFocused={isFocused}
            onPress={handleTabPress(index)}
            icon={icon}
            iconStyle={iconStyle}
            colorFocused='color-[--accent-color]'
            colorUnfocused='color-[--text-muted]'
          />
        );
      })}
    </View>
  );
};

export default CustomTabBar;
