import api from "../api/axios";

export const getDashboardStats = async () => {
    const response = await api.get("/api/v1/analytics/dashboard");
    return response.data;
};