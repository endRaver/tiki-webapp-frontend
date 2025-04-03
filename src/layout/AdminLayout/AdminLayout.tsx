import Header from "@/pages/adminPage/components/shared/Header";
import SliderBar from "@/pages/adminPage/components/shared/SliderBar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <div className="w-64 flex-shrink-0">
          <SliderBar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
