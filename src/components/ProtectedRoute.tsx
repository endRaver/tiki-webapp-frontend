import { useUserStore } from "@/store/useUserStore";
import { Navigate, Outlet } from "react-router-dom";
import { isEmpty } from "lodash";

const ProtectedRoute = () => {
  const { user } = useUserStore();

  if (isEmpty(user) || user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
