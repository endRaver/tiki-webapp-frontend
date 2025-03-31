import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";

import Homepage from "./pages/Homepage/HomePage";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
        </Route>
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
