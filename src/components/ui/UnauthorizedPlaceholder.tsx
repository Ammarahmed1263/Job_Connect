import AppButton from "./AppButton";
import AppText from "./AppText";
import AppIcon from "./AppIcon";
import { useTheme } from "@contexts/ThemeContext";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { IconName } from "./AppIcon";

interface UnauthorizedPlaceholderProps {
  title?: string;
  message?: string;
  icon?: IconName;
  iconSize?: number;
  buttonText?: string;
}

const UnauthorizedPlaceholder = ({
  title = "Authentication Required",
  message = "Please login to access this feature and enjoy the full experience of Job Connect.",
  icon = "user-circle",
  iconSize = 120,
  buttonText = "Login",
}: UnauthorizedPlaceholderProps) => {
  const router = useRouter();
  const { colors } = useTheme();
  const pathname = usePathname();

  const handleLogin = () => {
    router.push({
      pathname: "/login",
      params: { redirectTo: pathname },
    });
  };

  return (
    <View className="flex-1 items-center justify-center px-6">
      <View className="items-center">
        <AppIcon
          name={icon}
          size={iconSize}
          color={colors["--accent-color"]}
          style={styles.icon}
        />
        <AppText variant="medium" className="text-center text-xl mb-2 mt-6">
          {title}
        </AppText>
        <AppText
          variant="light"
          className="text-center text-[--text-muted] mb-8"
        >
          {message}
        </AppText>
        <AppButton
          title={buttonText}
          onPress={handleLogin}
          wrapperClassName="w-40"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    opacity: 0.9,
  },
});

export default UnauthorizedPlaceholder;
