import axios from "axios";
import toast from "react-hot-toast";
import { logoutOn401 } from "./authUtils";

const instance = axios.create({
  baseURL: "https://walnut-ecommerce-production-47826.up.railway.app",
});

// Attach JWT to every request
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle global errors
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      toast.error("Session expired. Logging out...");
      logoutOn401();
    } else {
      toast.error(error.response?.data?.error || "Request failed");
    }

    return Promise.reject(error);
  }
);

export default instance;
