import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="font-inter bg-white text-neutral-400">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
