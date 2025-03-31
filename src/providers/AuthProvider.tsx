import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { handleCheckAuth, checkingAuth } = useUserStore();

  useEffect(() => {
    handleCheckAuth();
  }, [handleCheckAuth]);

  if (checkingAuth) {
    return <div>Checking authentication...</div>;
  }

  return <>{children}</>;
};
