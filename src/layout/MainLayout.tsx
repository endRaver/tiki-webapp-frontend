import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import ModalLayout from "./AuthModal";

const MainLayout = () => {
  return (
    <div className="font-inter bg-white text-neutral-400">
      <Header />
      <Outlet />
      <Footer />
      <ModalLayout/>
    </div>
  );
};

export default MainLayout;
