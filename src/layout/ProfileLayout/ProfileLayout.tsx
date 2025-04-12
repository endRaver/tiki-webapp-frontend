import BreadCrumb from "@/components/ui/BreadCrumb";
import ProfileSidebar from "@/layout/ProfileLayout/components/ProfileSidebar";
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
          <ProfileSidebar />

          <div className="min-h-[800px] flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
