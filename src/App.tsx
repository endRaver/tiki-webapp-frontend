import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Admin from "./pages/adminPage/AdminPage";
import MainLayout from "./layout/MainLayout";

import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import ProfilePage from "./pages/Profilepage/ProfilePage";
import Homepage from "./pages/Homepage/HomePage";
import DashboardPage from "./pages/adminPage/DashboardPage";
import AdminLayout from "./layout/AdminLayout/AdminLayout";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/test" element={<ProfilePage />} />
        </Route>

        {/* <Route path="/admin" element={<Admin />} /> */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/categories" element={<Admin />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
