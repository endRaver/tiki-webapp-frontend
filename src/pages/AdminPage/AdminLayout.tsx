import { Outlet } from "react-router-dom";
import Header from "../AdminPage/components/shared/Header";
import SliderBar from "../AdminPage/components/shared/SliderBar";

const AdminLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="sticky top-0 z-10">
        <Header />
      </div>
      <div className="flex flex-1">
        <SliderBar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;