import ProfileHeader from "@components/profile/ProfileHeader";
import ProfileMenuSection from "@components/profile/ProfileMenuSection";
import { AppButton, AppDropdown, AppIcon, AppText } from "@components/ui";
import { hs } from "@constants/metrics";
import { PROFILE_MENU_ITEMS } from "@constants/profileMenuItems";
import { useTheme } from "@contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useSafeArea } from "@hooks/useSafeArea";
import useAuthStore from "@store/authStore";
import { useOnboardingStore } from "@store/onboardingStore";
import { Theme } from "@type/theme";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

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
    <ScrollView
      className="flex-1 bg-[--bg-color]"
      style={{ marginTop: top }}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Header */}
      {isAuthenticated && (
        <ProfileHeader
          name={user?.name || "Marion Torphy"}
          progress={70}
          onPress={() => router.push("/complete-profile")}
        />
      )}

      {/* Theme Selector */}
      <View className="mx-4 mt-6 mb-4 p-4 bg-[--card-color] rounded-xl shadow-sm">
        <View className="flex-row justify-between items-center">
          <AppText>Preferred Theme:</AppText>
          <View className="flex-1 ml-4 justify-center">
            <AppDropdown
              data={
                [
                  { label: "System", value: "system" },
                  { label: "Dark", value: "dark" },
                  { label: "Light", value: "light" },
                ] as { label: string; value: Theme }[]
              }
              value={theme}
              onChange={(item) => setTheme(item.value)}
              containerStyle={[
                styles.dropDownContainer,
                { backgroundColor: 'colors["--bg-color"]' },
              ]}
              fontFamily="Montserrat-Medium"
              renderRightIcon={(isFocus) => (
                <AppIcon
                  name={isFocus ? "alt-arrow-up" : "alt-arrow-down"}
                  size={25}
                  color={colors["--text-primary"]}
                />
              )}
              renderLeftIcon={(isFocus) => (
                <AppIcon
                  name="contrast"
                  color={colors["--text-primary"]}
                  size={22}
                  style={{
                    marginEnd: hs(5),
                  }}
                />
              )}
              labelField="label"
              valueField="value"
              disableSearch
            />
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <ProfileMenuSection items={PROFILE_MENU_ITEMS} />

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

const styles = StyleSheet.create({
  dropDownContainer: {
    borderWidth: 0,
    borderRadius: hs(10),
    overflow: "hidden",
  },
});
