import { useUserStore } from "@/store/useUserStore";

const Home = () => {
  const { handleLogout } = useUserStore();
  return (
    <div className="flex flex-col items-center justify-center">
      Home
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
