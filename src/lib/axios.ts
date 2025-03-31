import axios from "axios";
import { useUserStore } from "@/store/useUserStore";

// const url = "http://localhost:5000/api";
const url = "https://tiki-webapp-backend.onrender.com/api";

const axiosInstance = axios.create({
  baseURL: url,
  withCredentials: true,
});

let refreshPromise: Promise<void> | null = null;

const setupInterceptors = () => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // If a refresh is already in progress, wait for it to complete
          if (refreshPromise) {
            await refreshPromise;
            return axiosInstance(originalRequest);
          }

          // Start the refresh process
          refreshPromise = useUserStore.getState().refreshToken();
          await refreshPromise;
          refreshPromise = null;

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // If the refresh fails, logout the user
          useUserStore.getState().handleLogout();
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    },
  );
};

setupInterceptors();

export default axiosInstance;
