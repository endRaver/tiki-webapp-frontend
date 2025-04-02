import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import Homepage from "./pages/Homepage/HomePage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import ModalLayout from "./layout/modalLayout";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/" element={user ? <><Home /><ModalLayout/></> : <Navigate to="/login" />} />
        <Route path="/test" element={<ModalLayout/>} />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
