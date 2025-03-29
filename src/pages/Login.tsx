import React, { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { toast } from "react-hot-toast";

const Login = () => {
  const { handleLogin, loading, handleLogout } = useUserStore();
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("test123");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleLogin({ email, password });
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <button onClick={handleLogout}>Logout</button>
      <form onSubmit={handleSubmit} className="rounded bg-white p-6 shadow-md">
        <h1 className="mb-4 text-2xl">Login</h1>
        <div className="mb-4">
          <label className="mb-2 block">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border p-2"
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full rounded bg-blue-500 p-2 text-white ${loading ? "cursor-not-allowed opacity-50" : ""}`}
          disabled={loading}
        >
          {loading ? "Logging In..." : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default Login;
