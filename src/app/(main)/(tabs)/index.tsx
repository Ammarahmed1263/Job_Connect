import { AppButton, AppText } from "@components/ui";
import useAuthStore from "@store/authStore";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function HomeScreen() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();
  console.log("user after login: ", JSON.stringify(user, null, 2));

  const handleLogout = async () => {
    await logout();
  };

  const handleLogin = () => {
    router.push("/login");
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
    </View>
  );
}
