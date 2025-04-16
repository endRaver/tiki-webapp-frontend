import axios from "axios";

const API_URL = "https://tiki-webapp-backend.onrender.com/api/";
// const API_URL = "http://localhost:5000/api/";

// Tạo một instance của axios
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
