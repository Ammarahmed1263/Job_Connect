// hooks/useWithAuth.ts
import { useRouter, usePathname } from "expo-router";
import useAuthStore from "@store/authStore";

export const useWithAuth = () => {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const requireAuth = () => {
    if (!isAuthenticated) {
      router.push({
        pathname: "/login",
        params: { redirectTo: pathname },
      });
      return false;
    }
    return true;
  };

  return { requireAuth, isAuthenticated };
};
