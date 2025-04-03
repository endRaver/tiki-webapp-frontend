import { create } from "zustand";
import { toast } from "react-hot-toast";
import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";
import { User } from "@/types/user";

interface ErrorResponse {
  message: string;
}

interface UserStore {
  user: User | null;
  loading: boolean;
  checkingAuth: boolean;

  handleSignup: (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => Promise<void>;
  handleLogin: (data: { email: string; password: string }) => Promise<void>;
  handleLogout: () => Promise<void>;
  handleCheckAuth: () => Promise<void>;
  refreshToken: () => Promise<void>;
  handleGoogleLogin: (accessToken: string) => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  handleSignup: async ({
    name,
    email,
    password,
    confirmPassword,
  }: {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
  }) => {
    set({ loading: true });

    if (password !== confirmPassword) {
      set({ loading: false });
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axiosInstance.post("/auth/signup", {
        name,
        email,
        password,
      });

      set({ user: response.data, checkingAuth: false });

      toast.success("Account created successfully");
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message ?? "An error occurred");
    } finally {
      set({ loading: false });
    }
  },

  handleLogin: async ({ email, password }) => {
    set({ loading: true });

    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      set({ user: response.data });

      toast.success("Logged in successfully");
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message ?? "An error occurred");
    } finally {
      set({ loading: false });
    }
  },

  handleLogout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ user: null });
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message ?? "An error occurred");
    } finally {
      set({ loading: false });
    }
  },

  handleCheckAuth: async () => {
    set({ checkingAuth: true });
    try {
      const response = await axiosInstance.get("/auth/profile");
      set({ user: response.data, checkingAuth: false });
    } catch (error) {
      set({ checkingAuth: false, user: null });
      const axiosError = error as AxiosError<ErrorResponse>;
      console.log("Error in checkAuth", axiosError.response?.data?.message);
    }
  },

  refreshToken: async () => {
    // Prevent multiple simultaneous refresh attempts
    if (get().checkingAuth) return;

    set({ checkingAuth: true });

    try {
      const response = await axiosInstance.post("/auth/refresh-token");
      return response.data;
    } catch (error) {
      set({ user: null });
      throw error;
    } finally {
      set({ checkingAuth: false });
    }
  },

  handleGoogleLogin: async (accessToken) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post("/auth/google", {
        token: accessToken,
      });
      set({ user: response.data });
      toast.success("Logged in successfully");
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message ?? "An error occurred");
    } finally {
      set({ loading: false });
    }
  },
}));
