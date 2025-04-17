import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeaderMobile from "./components/HeaderMobile";
import HeaderCheckout from "./components/HeaderCheckout";
import FooterCheckout from "./components/FooterCheckout";
import AuthModal from "../AuthModal";

const MainLayout = () => {
  const pathname = useLocation().pathname;

  return (
    <div className="font-inter relative bg-white text-neutral-400">
      <div className="hidden md:block">
        {pathname === "/checkout" ? <HeaderCheckout /> : <Header />}
      </div>
      <div className="relative block md:hidden">
        {pathname.includes("checkout") ? <HeaderCheckout /> : <HeaderMobile />}
      </div>
      <Outlet />
      {pathname.includes("checkout") ? <FooterCheckout /> : <Footer />}
      <AuthModal />
    </div>
  );
};

export default MainLayout;
