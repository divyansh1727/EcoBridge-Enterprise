import api from "../api/analyticsApi";

export const getDashboardStats = async () => {
  const response = await api.get("/api/v1/analytics/dashboard");
  return response.data;
};