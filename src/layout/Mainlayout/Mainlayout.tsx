
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { Outlet } from "react-router-dom";

const MainLayout =()=>{
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    );
}
export default MainLayout;