import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../adminPage/components/shared/Header";
import SliderBar from "../adminPage/components/shared/SliderBar";

const AdminLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header cố định ở trên cùng */}
      <div className="sticky top-0 z-10">
        <Header />
      </div>
      {/* Nội dung chính */}
      <div className="flex flex-1">
        {/* SliderBar bắt đầu từ dưới Header */}
        <div className="w-64 flex-shrink-0">
          <SliderBar />
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;