// components/Icon.tsx
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
} from "@assets/icons";

// Map names to components
const icons: Record<string, FC<SvgProps>> = {
  home: home,
  "home-outline": home_outline,
  map: map,
  "map-outline": map_outline,
  bookmark: bookmark,
  "bookmark-outline": bookmark_outline,
  person: person,
  "person-outline": person_outline,
};

type IconProps = {
  name: keyof typeof icons;
  size?: number;
  color?: string;
};

const AppIcon: FC<IconProps> = ({ name, size = 24, color = "black", ...props }) => {
  const SvgIcon = icons[name];
  return <SvgIcon width={size} height={size} color={color} {...props} />;
};

export default AppIcon;
