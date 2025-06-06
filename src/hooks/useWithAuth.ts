import { useRouter, usePathname } from "expo-router";
import useAuthStore from "@store/authStore";

export const useWithAuth = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const router = useRouter();
  const pathname = usePathname();

  const requireAuth = () => {
    if (!isAuthenticated) {
      router.push({
        pathname: "/login",
        params: { redirectTo: pathname },
      });
      return true;
    }
    return false;
  };

  return { requireAuth, isAuthenticated };
};
