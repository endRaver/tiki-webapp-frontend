import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { Loader2 } from "lucide-react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { handleCheckAuth, checkingAuth } = useUserStore();

  useEffect(() => {
    handleCheckAuth();
  }, [handleCheckAuth]);

  useEffect(() => {
    if (checkingAuth) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Cleanup function to ensure scroll is re-enabled if component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [checkingAuth]);

  return (
    <>
      {checkingAuth && (
        <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/20">
          <Loader2 className="h-20 w-20 animate-spin" color="#0b74e5" />
        </div>
      )}
      {children}
    </>
  );
};
