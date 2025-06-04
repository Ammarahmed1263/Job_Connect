import React, { FC } from "react";
import { SvgProps } from "react-native-svg";
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
} from "@assets/icons";
import AppText from "./AppText";

const icons: Record<string, FC<SvgProps>> = {
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
};

interface IconProps extends SvgProps {
  name: keyof typeof icons;
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
