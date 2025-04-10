import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { Loader2 } from "lucide-react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { handleCheckAuth, checkingAuth } = useUserStore();

  useEffect(() => {
    handleCheckAuth();
  }, [handleCheckAuth]);

  return (
    <>
      {checkingAuth && (
        <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/20">
          <Loader2 className="animate-spin" size={40} color="#0A68FF" />
        </div>
      )}
      {children}
    </>
  );
};
