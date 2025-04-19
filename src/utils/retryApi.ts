import { AxiosError } from "axios";

export const retryApi = async <T>(
  apiCall: () => Promise<T>,
  maxRetries: number = 3,
): Promise<T> => {
  let lastError: AxiosError | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await apiCall();
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      lastError = axiosError;

      // If server is down or unreachable, throw immediately
      if (
        !axiosError.response ||
        axiosError.code === "ECONNREFUSED" ||
        axiosError.message.includes("Network Error") ||
        axiosError.message.includes("ERR_CONNECTION_REFUSED")
      ) {
        throw new Error("Server is currently unavailable");
      }

      // If it's a client error (4xx), throw immediately
      if (axiosError.response?.status < 500) {
        throw error;
      }

      // If we've exhausted all retries, throw the last error
      if (attempt === maxRetries) {
        throw lastError;
      }

      // Wait 1 second before retrying
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  throw lastError;
};
