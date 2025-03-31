import Header from "../components/ui/header";
import Footer from "../components/ui/footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="bg-white">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
