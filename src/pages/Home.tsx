import { useUserStore } from "@/store/useUserStore";

const Home = () => {
  const { handleLogout } = useUserStore();
  return (
    <div className="flex gap-4">
      Home
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
