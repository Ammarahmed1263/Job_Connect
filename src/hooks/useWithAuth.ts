import { useRouter, usePathname, Href } from "expo-router";
import useAuthStore from "@store/authStore";

export const useWithAuth = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const router = useRouter();
  const pathname = usePathname();

  const requireAuth = (redirect?: string) => {
    if (!isAuthenticated) {
      router.push({
        pathname: "/login",
        params: { redirectTo: redirect ?? pathname },
      });
      return true;
    }
    return false;
  };

  return { requireAuth, isAuthenticated };
};
