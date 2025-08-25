import ProfileHeader from "@components/profile/ProfileHeader";
import ProfileMenuSection from "@components/profile/ProfileMenuSection";
import { AppButton, AppDropdown, AppIcon, AppText } from "@components/ui";
import { hs, vs } from "@constants/metrics";
import { PROFILE_MENU_ITEMS } from "@constants/profileMenuItems";
import { TAB_HEIGHT } from "@constants/tabBar";
import { useTheme } from "@contexts/ThemeContext";
import { useSafeArea } from "@hooks/useSafeArea";
import { useSeekerProfile } from "@queries/userQueries";
import useAuthStore from "@store/authStore";
import { useProfileStore } from "@store/profileStore";
import { Theme } from "@type/theme";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo } from "react";
import { ScrollView, View } from "react-native";

const Profile = () => {
  const { setTheme, theme, colors } = useTheme();
  const { top } = useSafeArea();
  const router = useRouter();
  const { logout, isAuthenticated, user } = useAuthStore();
  const { setProfile, totalFields, completedFields } = useProfileStore(
    (state) => state
  );
  const { data, isSuccess } = useSeekerProfile(isAuthenticated);
  const profileProgress = useMemo(
    () => Math.round((completedFields / totalFields) * 100) || 0,
    [totalFields, completedFields]
  );

  useEffect(() => {
    if (isSuccess && data?.data) {
      setProfile(data.data);
    }
  }, [data, isSuccess, setProfile]);

  const handleLogout = async () => {
    await logout();
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <ScrollView
      className="flex-1 bg-[--bg-color]"
      style={{ marginTop: top }}
      contentContainerStyle={{
        paddingTop: vs(12),
        paddingBottom: vs(TAB_HEIGHT + 12),
      }}
      showsVerticalScrollIndicator={false}
    >
      {isAuthenticated && (
        <ProfileHeader
          name={user?.name || "unavailable"}
          progress={profileProgress}
          onPress={() => router.push("/complete-profile")}
          subtitle={profileProgress == 100? "View Profile Details" : "Complete Profile"}
        />
      )}

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
              fontFamily="Montserrat-Medium"
              renderRightIcon={({ isFocused }) => (
                <AppIcon
                  name={isFocused ? "alt-arrow-up" : "alt-arrow-down"}
                  size={25}
                  color={
                    isFocused
                      ? colors["--accent-color"]
                      : colors["--text-primary"]
                  }
                />
              )}
              renderLeftIcon={({ isFocused }) => (
                <AppIcon
                  name="contrast"
                  color={
                    isFocused
                      ? colors["--accent-color"]
                      : colors["--text-primary"]
                  }
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

      <ProfileMenuSection items={PROFILE_MENU_ITEMS} />
      <View className="items-end justify-between mx-4 my-6 gap-4">
        <AppButton
          title={!isAuthenticated ? "Login" : "Logout"}
          onPress={!isAuthenticated ? handleLogin : handleLogout}
          textClassName="!text-[--accent-color]"
          flat
        />
      </View>
    </ScrollView>
  );
};

export default Profile;
