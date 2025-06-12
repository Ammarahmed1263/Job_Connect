import { useTheme } from "@contexts/ThemeContext";
import { useSafeArea } from "@hooks/useSafeArea";
import { useRouter } from "expo-router";
import React, { FC, ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import AppButton from "./AppButton";
import AppIcon from "./AppIcon";
import AppText from "./AppText";

interface NavigationHeaderProps {
  children?: ReactNode;
  title?: string;
  showBackButton?: boolean;
  style?: StyleProp<ViewStyle>
}

const NavigationHeader: FC<NavigationHeaderProps> = ({
  title,
  children,
  showBackButton = true,
  style,
}) => {
  const { top } = useSafeArea();
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <View
      className="flex-row items-center justify-between px-4 min-h-14"
      style={[
        style,
        {marginTop: top + (style && 'marginTop' in style && typeof style.marginTop === 'number' ? style.marginTop : 0)},
      ]}
    >
      <View className="w-20 h-12 items-start justify-center">
        {showBackButton && router.canGoBack() && (
          <AppButton
            title=""
            onPress={() => router.back()}
            flat
            wrapperClassName="w-12 h-full border-2 items-center justify-center border-[--border-color]"
            className="flex-1"
          >
            <AppIcon
              name="arrow-left"
              size={30}
              color={colors["--accent-color"]}
            />
          </AppButton>
        )}
      </View>

      {title && (
        <View
          className="absolute items-center justify-center"
          style={{
            left: 0,
            right: 0,
          }}
        >
          <AppText variant="semiBold" numberOfLines={1} style={{ textAlign: "center" }}>
            {title}
          </AppText>
        </View>
      )}

      {children && (
        <View className="w-18 h-12 items-end justify-center">{children}</View>
      )}
    </View>
  );
};

export default NavigationHeader;
