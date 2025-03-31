import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import Homepage from "./pages/Homepage/HomePage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
