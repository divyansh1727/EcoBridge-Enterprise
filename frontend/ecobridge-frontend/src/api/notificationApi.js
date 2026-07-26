import axios from "axios";

console.log("Notification Base URL =", import.meta.env.VITE_NOTIFICATION_URL);

const api = axios.create({
  baseURL: import.meta.env.VITE_NOTIFICATION_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  console.log("Final Request URL =", config.baseURL + config.url);

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;