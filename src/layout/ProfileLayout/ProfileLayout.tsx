import BreadCrumb from "@/components/ui/BreadCrumb";
import UserInfo from "@/layout/ProfileLayout/components/ProfileSidebar";
import { useUserStore } from "@/store/useUserStore";
import { isEmpty } from "lodash";
import { Navigate, Outlet } from "react-router-dom";

const ProfileLayout = () => {
  const { user } = useUserStore();

  if (isEmpty(user)) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <div className="bg-background">
      <div className="px-4">
        <BreadCrumb />
      </div>
        <div className="container mx-auto flex gap-4">
          <UserInfo />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
