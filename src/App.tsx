


import { Toaster } from "react-hot-toast";
import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./pages/SignupPage/SignupPage";
import Login from "./pages/LoginPage/LoginPage";
import { useUserStore } from "./store/useUserStore";
import Home from "./pages/Homepage/Home";
import MainLayout from "./layout/Mainlayout/Mainlayout";
import Detailpage from "./pages/Detailpage/DetailPage";


function App() {
  const { user } = useUserStore();

  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <Signup />}
          />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/" element={<Home /> } />
          <Route path="/test" element={<Detailpage /> } />

        </Route>
      </Routes>

      <Toaster />

    </>
  );
}

export default App;
