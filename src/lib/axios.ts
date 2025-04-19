import axios from "axios";
import { useUserStore } from "@/store/useUserStore";
import { retryApi } from "@/utils/retryApi";

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

      // Handle 401 errors (unauthorized)
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          if (refreshPromise) {
            await refreshPromise;
            return axiosInstance(originalRequest);
          }

          refreshPromise = useUserStore.getState().refreshToken();
          await refreshPromise;
          refreshPromise = null;

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          useUserStore.getState().handleLogout();
          return Promise.reject(refreshError);
        }
      }

      // For server errors (5xx) or network errors, retry 3 times
      if (error.response?.status >= 500 || !error.response) {
        // If this request is already being retried, don't start a new retry sequence
        if (originalRequest._isRetrying) {
          return Promise.reject(error);
        }

        originalRequest._isRetrying = true;
        try {
          return await retryApi(() => axiosInstance(originalRequest));
        } finally {
          originalRequest._isRetrying = false;
        }
      }

      return Promise.reject(error);
    },
  );
};

setupInterceptors();
export default axiosInstance;
