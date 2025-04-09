import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import HeaderMobile from "./components/HeaderMobile";
import { SidebarProvider } from "@/contexts/HomeContext";

const MainLayout = () => {
  return (
    <div className="font-inter bg-white text-neutral-400">
      <SidebarProvider>
        <Header />
        <HeaderMobile />
        <Outlet />
        <Footer />
      </SidebarProvider>
    </div>
  );
};

export default MainLayout;
