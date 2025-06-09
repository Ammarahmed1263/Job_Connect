import React, { FC } from "react";
import { Filter, SvgProps } from "react-native-svg";
import {
  home,
  home_outline,
  map,
  map_outline,
  bookmark,
  bookmark_outline,
  person,
  person_outline,
  eye_closed,
  eye_outline,
  case_outline,
  case as case_,
  bell,
  bell_outline,
  arrow_left,
  arrow_right,
  share,
  map_point,
  map_point_outline,
  magnifier,
  close_circle,
  arrow_right_up,
  close,
  filter,
  filter_outline,
} from "@assets/icons";
import AppText from "./AppText";

const icons = {
  home: home,
  "home-outline": home_outline,
  map: map,
  "map-outline": map_outline,
  bookmark: bookmark,
  "bookmark-outline": bookmark_outline,
  person: person,
  "person-outline": person_outline,
  "eye-closed": eye_closed,
  "eye-outline": eye_outline,
  case: case_,
  "case-outline": case_outline,
  bell: bell,
  "bell-outline": bell_outline,
  "arrow-left": arrow_left,
  "arrow-right": arrow_right,
  share: share,
  "map-point": map_point,
  "map-point-outline": map_point_outline,
  magnifier: magnifier,
  "close-circle": close_circle,
  "arrow-right-up": arrow_right_up,
  close: close,
  filter: filter,
  "filter-outline": filter_outline,
} as const;

type IconName = keyof typeof icons;

interface IconProps extends SvgProps {
  name: IconName;
  size?: number;
  color?: string;
}

const AppIcon: FC<IconProps> = ({ name, size = 24, color = "black", ...props }) => {
  const SvgIcon = icons[name];

  if (!SvgIcon) {
    if (__DEV__) {
      console.warn(`[AppIcon] Invalid icon name passed: "${name}"`);
    }
    return <AppText style={{ fontSize: size, color }}>?</AppText>;
  }

  return <SvgIcon width={size} height={size} color={color} {...props} />;
};

export default AppIcon;
