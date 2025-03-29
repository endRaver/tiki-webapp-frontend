import axios from "axios";

// const url = "http://localhost:5000/api";
const url = "https://tiki-webapp-backend.onrender.com/api";

const axiosInstance = axios.create({
  baseURL: url,
  withCredentials: true,
});

export default axiosInstance;
