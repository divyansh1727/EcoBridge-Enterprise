import axios from "axios";

const baseURL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Remove duplicate /api if both baseURL and request contain it
  if (config.baseURL && config.url) {
    config.url = config.url.replace(/^\/api\/(.*)$/, "/$1");
  }

  return config;
});

export default api;