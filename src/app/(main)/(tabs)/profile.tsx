import ProfileHeader from "@components/profile/ProfileHeader";
import ProfileMenuSection from "@components/profile/ProfileMenuSection";
import { AppButton, AppDropdown, AppIcon, AppText } from "@components/ui";
import { hs, vs } from "@constants/metrics";
import { PROFILE_MENU_ITEMS } from "@constants/profileMenuItems";
import { useTheme } from "@contexts/ThemeContext";
import { useSafeArea } from "@hooks/useSafeArea";
import { useSeekerProfile } from "@queries/userQueries";
import useAuthStore from "@store/authStore";
import { useOnboardingStore } from "@store/onboardingStore";
import { useProfileStore } from "@store/profileStore";
import { Theme } from "@type/theme";
import { countNonEmptyFields } from "@utils";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const Profile = () => {
  const { setTheme, theme, colors } = useTheme();
  const { top } = useSafeArea();
  const router = useRouter();
  const { logout, isAuthenticated, user } = useAuthStore();
  const testOnboarding = useOnboardingStore((state) => state.testOnboarding);
  const { data, isPending } = useSeekerProfile();
  const { setProfile } = useProfileStore();

  const progress =
    data && data.data
      ? Math.round((countNonEmptyFields(data.data) / Object.keys(data.data).length) * 100)
      : 0;

  useEffect(() => {
    if (data && data.data) {
      setProfile(data.data);
    }
  }, [data, setProfile]);

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

  if (isPending) {
    return (
      <View className="flex-1 items-center justify-center">
        <AppText>Loading...</AppText>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-[--bg-color]"
      style={{ marginTop: top }}
      contentContainerStyle={{ paddingVertical: vs(12) }}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Header */}
      {isAuthenticated && (
        <ProfileHeader
          name={user?.name || "unavailable"}
          progress={progress}
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
        <AppButton
          title="register"
          onPress={() => router.push("/register")}
          flat
        />
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
