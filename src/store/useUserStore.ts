import { create } from "zustand";
import { toast } from "react-hot-toast";
import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";
import { User } from "@/types/user";

interface ErrorResponse {
  success: boolean;
  message: string;
}

interface UserStore {
  user: User | null;
  loading: boolean;
  checkingAuth: boolean;

  handleSignup: (data: { email: string; password: string }) => Promise<{
    success: boolean;
    message: string | undefined;
  }>;
  handleLogin: (data: {
    email: string;
    password: string;
  }) => Promise<{ success: boolean; message: string | undefined }>;
  handleLogout: () => Promise<void>;
  handleCheckAuth: () => Promise<void>;
  refreshToken: () => Promise<void>;
  handleGoogleLogin: (accessToken: string) => Promise<void>;
  handleForgetPassword: (
    email: string,
  ) => Promise<{ success: boolean; message: string | undefined }>;
  handleVerifyEmail: (code: string) => Promise<{
    success: boolean;
    message: string | undefined;
  }>;
  handleResetPassword: (
    token: string,
    newPassword: string,
  ) => Promise<{ success: boolean; message: string | undefined }>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  handleSignup: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    set({ loading: true });

    try {
      const response = await axiosInstance.post("/auth/signup", {
        email,
        password,
      });

      return { success: true, message: response.data.message };
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      return { success: false, message: axiosError.response?.data?.message };
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
      console.log(response.data);

      toast.success(response.data.message);
      return { success: true, message: response.data.message };
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      return { success: false, message: axiosError.response?.data?.message };
    } finally {
      set({ loading: false });
    }
  },

  handleLogout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ user: null });
      toast.success("Đăng xuất thành công");
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
      toast.success("Đăng nhập thành công");
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message ?? "An error occurred");
    } finally {
      set({ loading: false });
    }
  },

  handleForgetPassword: async (email) => {
    set({ loading: true });

    try {
      await axiosInstance.post("/auth/forgot-password", {
        email,
      });

      toast.success("Email đã được gửi đến bạn");
      return { success: true, message: "Email đã được gửi đến bạn" };
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      return { success: false, message: axiosError.response?.data?.message };
    } finally {
      set({ loading: false });
    }
  },

  handleVerifyEmail: async (code: string) => {
    set({ loading: true });

    try {
      await axiosInstance.post("/auth/verify-email", {
        code,
      });

      return { success: true, message: "Email đã được xác thực" };
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      return { success: false, message: axiosError.response?.data?.message };
    } finally {
      set({ loading: false });
    }
  },

  handleResetPassword: async (token: string, newPassword: string) => {
    set({ loading: true });

    try {
      const response = await axiosInstance.post(
        `/auth/reset-password/${token}`,
        { password: newPassword },
      );

      toast.success("Đặt lại mật khẩu thành công");
      return { success: true, message: response.data.message };
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage =
        axiosError.response?.data?.message ?? "Đã có lỗi xảy ra";
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      set({ loading: false });
    }
  },
}));
