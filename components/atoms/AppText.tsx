import { FontVariants, fontVariants } from "@constants/Fonts";
import clsx from "clsx";
import React, { FC, ReactNode } from "react";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";

interface AppTextProps extends TextProps {
  className?: string;
  style?: StyleProp<TextStyle>;
  variant?: FontVariants;
}

const AppText: FC<AppTextProps> = ({
  children,
  variant = "medium",
  className,
  style,
  ...props
}) => {
  return (
    <Text
      className={clsx("text-[--text-primary]", className)}
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
