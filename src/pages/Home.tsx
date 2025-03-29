import React from "react";
import { useUserStore } from "@/store/useUserStore";
const Home = () => {
  const { handleLogout } = useUserStore();
  return (
    <div>
      Home
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
