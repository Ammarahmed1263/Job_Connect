import { AppButton, AppText } from "@components/ui";
import useAuthStore from "@store/authStore";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function HomeScreen() {
  const { user, isAuthenticated, logout, setOnboarding } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const handleOnboarding = () => {
    router.replace("/onboarding");
    setOnboarding(false);
  };

  // if (!isAuthenticated) {
  //   return null;
  // }

  return (
    <View className="flex-1 items-center justify-center">
      {isAuthenticated ? (
        <>
          <AppText>Name: {user?.name}</AppText>
          <AppText>Email: {user?.email}</AppText>
          <AppButton title="Logout" onPress={handleLogout} />
        </>
      ) : (
        <AppButton
          title="Login"
          onPress={handleLogin}
          wrapperClassName="self-center"
        />
      )}
      <AppButton
        title="onboarding"
        variant="secondary"
        onPress={handleOnboarding}
        wrapperClassName="self-center my-4"
      />
    </View>
  );
}
