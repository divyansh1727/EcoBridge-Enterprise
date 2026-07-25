import api from "../api/analyticsApi";

export const getDashboardStats = async () => {
  const response = await api.get("/api/v1/");
  return response.data;
};