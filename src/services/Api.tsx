import axios from "axios";

// Tạo một instance của axios
const api = axios.create({
  baseURL: "https://tiki-webapp-backend.onrender.com/api/", 
  timeout: 10000, 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;