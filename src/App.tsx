import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import Homepage from "./pages/Homepage/HomePage";
import Profile from "./pages/Profilepage/Profile";
import Detailpage from "./pages/Detailpage/DetailPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/test" element={<Detailpage />} />
        </Route>
      </Routes>

      <Toaster />
    </>
  );
}

export default App;