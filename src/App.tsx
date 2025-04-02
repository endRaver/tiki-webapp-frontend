import { Toaster } from "react-hot-toast";
import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./pages/SignupPage/SignupPage";
import Login from "./pages/LoginPage/LoginPage";
import Home from "./pages/Homepage/Home";
import Admin from "./pages/adminPage/AdminPage";
import { useUserStore } from "./store/useUserStore";



function App() {
  const { user } = useUserStore();

  return (
    <>
      <Routes>
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
