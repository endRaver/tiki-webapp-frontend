import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeaderMobile from "./components/HeaderMobile";

const MainLayout = () => {
  return (
    <div className="font-inter relative bg-white text-neutral-400">
      <div className="hidden md:block">
        <Header />
      </div>
      <div className="relative block md:hidden">
        <HeaderMobile />
      </div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
