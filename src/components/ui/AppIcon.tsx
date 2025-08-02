import {
  academic_cap,
  alt_arrow_down,
  alt_arrow_right,
  alt_arrow_up,
  arrow_left,
  arrow_right,
  arrow_right_up,
  bell,
  bell_outline,
  bookmark,
  bookmark_outline,
  calendar,
  case as case_,
  case_outline,
  chart,
  check_circle,
  city,
  clipboard,
  close,
  close_circle,
  contrast,
  diploma,
  document_text,
  eye_closed,
  eye_outline,
  facebook,
  family,
  file_send,
  filter,
  filter_outline,
  home,
  home_outline,
  home_person,
  instagram,
  letter,
  linkedin,
  magnifier,
  map,
  map_outline,
  map_point,
  map_point_outline,
  person,
  person_outline,
  phone,
  ring,
  share,
  trash_bin,
  twitter,
  user_id,
  user_circle,
  pen_round
} from "@assets/icons";
import React, { FC } from "react";
import { SvgProps } from "react-native-svg";
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
  "alt-arrow-up": alt_arrow_up,
  "alt-arrow-down": alt_arrow_down,
  contrast: contrast,
  "academic-cap": academic_cap,
  chart: chart,
  diploma: diploma,
  "document-text": document_text,
  "user-id": user_id,
  "checkmark": check_circle,
  "alt-arrow-right": alt_arrow_right,
  "file-send": file_send,
  "trash-bin": trash_bin,
  facebook: facebook,
  instagram: instagram,
  linkedin: linkedin,
  twitter: twitter,
  calendar: calendar,
  city: city,
  clipboard: clipboard,
  family: family,
  "home-person": home_person,
  letter: letter,
  ring: ring,
  phone: phone,
  "user-circle": user_circle,
  "pen-round": pen_round,
} as const;

export type IconName = keyof typeof icons;

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
