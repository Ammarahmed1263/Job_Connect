import ProfileHeader from "@components/profile/ProfileHeader";
import ProfileMenuSection from "@components/profile/ProfileMenuSection";
import { AppButton, AppDropdown, AppText } from "@components/ui";
import { PROFILE_MENU_ITEMS } from "@constants/profileMenuItems";
import { useTheme } from "@contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useSafeArea } from "@hooks/useSafeArea";
import useAuthStore from "@store/authStore";
import { useOnboardingStore } from "@store/onboardingStore";
import { Theme } from "@type/theme";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";

const Profile = () => {
  const { setTheme, theme, colors } = useTheme();
  const { top } = useSafeArea();
  const router = useRouter();
  const { logout, isAuthenticated, user } = useAuthStore();
  const { testOnboarding } = useOnboardingStore();

  const handleLogout = async () => {
    await logout();
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const handleOnboarding = () => {
    router.replace("/onboarding");
    testOnboarding(false);
  };

  return (
    <ScrollView className="flex-1 bg-[--bg-color]" style={{ paddingTop: top }}>
      {/* Profile Header */}
      {isAuthenticated && (
        <ProfileHeader
          name={user?.name || "Marion Torphy"}
          progress={70}
          onPress={() => console.log("Profile pressed")}
        />
      )}

      {/* Menu Items */}
      <ProfileMenuSection items={PROFILE_MENU_ITEMS} />

      {/* Theme Selector */}
      <View className="mx-4 mt-6 mb-4 p-4 bg-[--card-color] rounded-xl shadow-sm">
        <View className="flex-row justify-between items-center">
          <AppText>Preferred Theme:</AppText>
          <View className="flex-1 ml-4">
            <AppDropdown
              label="Theme"
              data={
                [
                  { label: "System", value: "system" },
                  { label: "Dark", value: "dark" },
                  { label: "Light", value: "light" },
                ] as { label: string; value: Theme }[]
              }
              value={theme}
              onChange={(item) => setTheme(item.value)}
              focusColor={colors["--accent-color"]}
              unfocusColor={colors["--text-primary"]}
              renderRightIcon={(isFocus) => (
                <Ionicons
                  name={isFocus ? "caret-up" : "caret-down"}
                  size={20}
                  color={
                    isFocus
                      ? colors["--accent-color"]
                      : colors["--text-primary"]
                  }
                />
              )}
              renderLeftIcon={(isFocus) => (
                <Ionicons
                  name={"contrast"}
                  size={20}
                  color={
                    isFocus
                      ? colors["--accent-color"]
                      : colors["--text-primary"]
                  }
                  style={{ marginRight: 5 }}
                />
              )}
              labelField="label"
              valueField="value"
              disableSearch
            />
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="items-end justify-between mx-4 my-6 gap-4">
        <AppButton
          title={!isAuthenticated ? "Login" : "Logout"}
          onPress={!isAuthenticated ? handleLogin : handleLogout}
          textClassName="!text-[--accent-color]"
          flat
        />
        <AppButton title="Onboarding" onPress={handleOnboarding} flat />
      </View>
    </ScrollView>
  );
};

export default Profile;
