import { FontVariants, fontVariants } from "@constants/Fonts";
import clsx from "clsx";
import React, { FC } from "react";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";

interface AppTextProps extends TextProps {
  className?: TextProps['className'];
  style?: StyleProp<TextStyle>;
  variant?: FontVariants;
}

const AppText: FC<AppTextProps> = ({
  children,
  variant = "regular",
  className,
  style,
  ...props
}) => {
  return (
    <Text
      className={clsx("text-[--text-primary] leading-tight", className)}
      style={[
        {
          ...fontVariants[variant],
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default AppText;
