import { Toaster } from "react-hot-toast";
import { Route, Routes, Navigate } from "react-router-dom";
import Admin from "./pages/adminPage/AdminPage";
import MainLayout from "./layout/MainLayout";
import Homepage from "./pages/Homepage/Homepage";
import Profile from "./pages/ProfilePage/Profile";



function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/test" element={<Profile />} />
        </Route>
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
