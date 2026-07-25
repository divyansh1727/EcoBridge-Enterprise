import api from "../api/analyticsApi";

export const getDashboardStats = () => {
  return api.get("/api/v1/analytics/dashboard");
};